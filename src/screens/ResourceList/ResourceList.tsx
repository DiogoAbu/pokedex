import React, { FC, useEffect, useRef, useState } from 'react';
import { Animated, Platform, useWindowDimensions } from 'react-native';

import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useNavigation, useRoute } from '@react-navigation/native';
import { HeaderBackButton } from '@react-navigation/stack';
import { IApiResource, IPokemon } from 'pokeapi-typescript';

import Icon from '!/components/Icon';
import LoadingPokeball from '!/components/LoadingPokeball';
import Text from '!/components/Text';
import useMethod from '!/hooks/use-method';
import usePokeApi from '!/hooks/use-poke-api';
import usePress from '!/hooks/use-press';
import { constants } from '!/services/theme';
import { MainNavigationProp, MainRouteProp } from '!/types';
import { getHeaderHeight } from '!/utils/get-header-height';
import getResourceName from '!/utils/get-resource-name';

import PokemonItem from './PokemonItem';
import styles from './styles';

const keyExtractor = (item: IApiResource<IPokemon>, index: number) => item.url + index.toString();

const ResourceList: FC = () => {
  const navigation = useNavigation<MainNavigationProp<'ResourceList'>>();
  const { params } = useRoute<MainRouteProp<'ResourceList'>>();
  const layout = useWindowDimensions();

  const [page, setPage] = useState(1);
  const { data } = usePokeApi({ endpoint: 'Pokemon', page, priority: 1 });

  const scrollY = useRef(new Animated.Value(0)).current;
  const HEADER_HEIGHT = getHeaderHeight(layout) - getStatusBarHeight();

  const translateY = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
    extrapolate: 'clamp',
  });

  const translateX = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [constants.grid, 40],
    extrapolate: 'clamp',
  });

  const scale = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [1, 0.85],
    extrapolate: 'clamp',
  });

  const handleOpenSearchbar = usePress(() => {
    //
  });

  const fetchNextPage = useMethod(() => {
    if (data?.next) {
      setPage((prev) => prev + 1);
    }
  });

  useEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: (props) => (
        <HeaderBackButton
          {...props}
          backImage={({ tintColor }) => <Icon color={tintColor} name='magnify' size={30} />}
          labelVisible={false}
          onPress={handleOpenSearchbar}
        />
      ),
    });
  }, [handleOpenSearchbar, navigation]);

  return (
    <>
      <Animated.FlatList
        contentContainerStyle={[styles.contentContainer, { paddingTop: HEADER_HEIGHT + constants.grid }]}
        data={data?.results}
        initialNumToRender={10}
        keyExtractor={keyExtractor}
        ListFooterComponent={data?.next ? <LoadingPokeball /> : null}
        maxToRenderPerBatch={2}
        onEndReached={fetchNextPage}
        onEndReachedThreshold={0.2}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: true,
        })}
        removeClippedSubviews={Platform.OS === 'android'}
        renderItem={(props) => <PokemonItem {...props} />}
        scrollEventThrottle={16}
        updateCellsBatchingPeriod={100}
        windowSize={16}
      />

      <Animated.View
        style={[
          styles.headerContainer,
          { height: HEADER_HEIGHT, transform: [{ translateY }, { scale }, { translateX }] },
        ]}
      >
        <Text style={styles.headerTitle}>{getResourceName(params.resource)}</Text>
      </Animated.View>
    </>
  );
};

export default ResourceList;
