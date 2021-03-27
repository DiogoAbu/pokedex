import React, { FC, useEffect } from 'react';
import { ScrollView, View } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useTheme } from '@react-navigation/native';

import Searchbar from '!/components/Searchbar';
import Text from '!/components/Text';
import ButtonCard from '!/screens/Home/ButtonCard';
import { constants } from '!/services/theme';
import { MainNavigationProp } from '!/types';

import styles from './styles';

const Home: FC = () => {
  const navigation = useNavigation<MainNavigationProp<'Home'>>();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <ScrollView contentContainerStyle={styles.contentContainer} style={{ backgroundColor: colors.border }}>
      <View
        style={[
          styles.card,
          {
            backgroundColor: colors.card,
            paddingBottom: insets.bottom + constants.gridBig,
            paddingLeft: insets.left + constants.grid,
            paddingRight: insets.right + constants.grid,
            paddingTop: insets.top + constants.grid,
          },
        ]}
      >
        <Text style={styles.title} testID='home-title'>
          What are you looking for?
        </Text>

        <Searchbar style={styles.searchbar} />

        <View style={styles.row}>
          <ButtonCard resource='pokemons' />
          <ButtonCard disabled resource='moves' right />
        </View>
        <View style={styles.row}>
          <ButtonCard disabled resource='abilities' />
          <ButtonCard disabled resource='items' right />
        </View>
        <View style={styles.row}>
          <ButtonCard bottom disabled resource='locations' />
          <ButtonCard bottom disabled resource='typeCharts' right />
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;
