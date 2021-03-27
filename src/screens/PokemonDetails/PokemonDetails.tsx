import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  InteractionManager,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  useWindowDimensions,
  View,
} from 'react-native';

import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useNavigation, useRoute, useTheme } from '@react-navigation/native';
import { HeaderBackButton } from '@react-navigation/stack';

import Icon from '!/components/Icon';
import useMethod from '!/hooks/use-method';
import usePokeApi from '!/hooks/use-poke-api';
import { constants } from '!/services/theme';
import { MainNavigationProp, MainRouteProp } from '!/types';
import { getHeaderHeight } from '!/utils/get-header-height';
import getIdFromUrl from '!/utils/get-id-from-url';

import About from './About';
import AboutSkeleton from './AboutSkeleton';
import BaseStats from './BaseStats';
import Evolution from './Evolution';
import HeaderInfo from './HeaderInfo';
import HeaderTitle from './HeaderTitle';
import Moves from './Moves';
import styles from './styles';

const HEADER_INFO_FOOTER_HEIGHT = 56;
const HEADER_INFO_HEIGHT = 160 + HEADER_INFO_FOOTER_HEIGHT;
const statusBarHeight = getStatusBarHeight();

const PokemonDetails: FC = () => {
  const navigation = useNavigation<MainNavigationProp<'PokemonDetails'>>();
  const { params } = useRoute<MainRouteProp<'PokemonDetails'>>();
  const { colors } = useTheme();
  const layout = useWindowDimensions();

  const { id, backgroundColor } = params;

  const scrollVerticalRef = useRef<ScrollView>(null);
  const scrollHorizontalRef = useRef<ScrollView>(null);
  const offsetY = useRef(0);
  const offsetX = useRef(0);
  const offsetPrevX = useRef(0);
  const [scrollHeight, setScrollHeight] = useState(0);

  const { data: pokemon, makeRequest } = usePokeApi({
    endpoint: 'Pokemon',
    id,
    page: undefined,
    mutateData: undefined,
    autoRequest: false,
  });

  const { data: species } = usePokeApi({
    endpoint: 'PokemonSpecies',
    id: pokemon ? getIdFromUrl(pokemon.species.url) : undefined,
    page: undefined,
    mutateData: undefined,
  });

  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollX = useRef(new Animated.Value(0)).current;

  const MIN_HEIGHT = getHeaderHeight(layout);
  const MAX_HEIGHT = MIN_HEIGHT + (MIN_HEIGHT - statusBarHeight);
  const TITLE_SCROLL_DISTANCE = MAX_HEIGHT - MIN_HEIGHT;
  const INFO_SCROLL_DISTANCE = MAX_HEIGHT + MIN_HEIGHT;

  const handleScrollHorizontalBegin = useMethod(() => {
    offsetPrevX.current = offsetX.current;
  });

  const handleScrollBackUp = useMethod(() => {
    const diffX = Math.abs(offsetPrevX.current - offsetX.current);
    if (offsetY.current > INFO_SCROLL_DISTANCE && diffX >= layout.width - 50) {
      scrollVerticalRef.current?.scrollTo({ y: INFO_SCROLL_DISTANCE });
    }
  });

  const handleScrollBackUpPressable = useMethod(() => {
    if (offsetY.current > INFO_SCROLL_DISTANCE) {
      scrollVerticalRef.current?.scrollTo({ y: INFO_SCROLL_DISTANCE });
    }
  });

  const handleOnScrollVertical = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, contentSize } = event.nativeEvent;
    offsetY.current = contentOffset.y;
    setScrollHeight(contentSize.height);
  }, []);
  const handleOnScrollHorizontal = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset } = event.nativeEvent;
    offsetX.current = contentOffset.x;
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerTintColor: constants.colors.white,
      headerRight: HeaderRight,
    });

    void InteractionManager.runAfterInteractions(() => {
      void makeRequest();
    });
  }, [makeRequest, navigation]);

  const displayFooterImage = scrollHeight > layout.height;

  return (
    <>
      <Animated.ScrollView
        contentContainerStyle={[
          styles.contentContainer,
          { paddingTop: MAX_HEIGHT + HEADER_INFO_HEIGHT, backgroundColor: colors.card },
        ]}
        onScroll={Animated.event<NativeScrollEvent>([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: true,
          listener: handleOnScrollVertical,
        })}
        ref={scrollVerticalRef}
        scrollEnabled={!!(pokemon && species)}
        scrollEventThrottle={16}
        style={{ backgroundColor }}
      >
        <Animated.ScrollView
          decelerationRate='fast'
          horizontal
          onMomentumScrollEnd={handleScrollBackUp}
          onScroll={Animated.event<NativeScrollEvent>([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
            useNativeDriver: true,
            listener: handleOnScrollHorizontal,
          })}
          onScrollBeginDrag={handleScrollHorizontalBegin}
          overScrollMode='never'
          ref={scrollHorizontalRef}
          scrollEnabled={!!(pokemon && species)}
          scrollEventThrottle={16}
          snapToAlignment='center'
          snapToInterval={layout.width}
        >
          {pokemon && species ? (
            <>
              <View style={{ width: layout.width }}>
                <About displayFooterImage={displayFooterImage} pokemon={pokemon} species={species} />
              </View>
              <View style={{ width: layout.width }}>
                <BaseStats displayFooterImage={displayFooterImage} pokemon={pokemon} />
              </View>
              <View style={{ width: layout.width }}>
                <Evolution displayFooterImage={displayFooterImage} species={species} />
              </View>
              <View style={{ width: layout.width }}>
                <Moves pokemon={pokemon} />
              </View>
            </>
          ) : (
            <AboutSkeleton />
          )}
        </Animated.ScrollView>
      </Animated.ScrollView>

      <HeaderInfo
        containerHeight={HEADER_INFO_HEIGHT}
        footerHeight={HEADER_INFO_FOOTER_HEIGHT}
        handleScrollBackUpPressable={handleScrollBackUpPressable}
        infoScrollDistance={INFO_SCROLL_DISTANCE}
        maxHeight={MAX_HEIGHT}
        scrollHorizontalRef={scrollHorizontalRef}
        scrollX={scrollX}
        scrollY={scrollY}
        viewWidth={layout.width}
      />

      <HeaderTitle
        maxHeight={MAX_HEIGHT}
        scrollDistance={TITLE_SCROLL_DISTANCE}
        scrollY={scrollY}
        statusBarHeight={statusBarHeight}
      />
    </>
  );
};

const HeaderRight = (props: { tintColor?: string }) => (
  <HeaderBackButton
    {...props}
    backImage={({ tintColor }) => <Icon color={tintColor} name='pokeball' size={30} />}
    labelVisible={false}
  />
);

export default PokemonDetails;
