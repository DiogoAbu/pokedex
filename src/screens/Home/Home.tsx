import React, { FC, useEffect } from 'react';
import { ScrollView, View } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useTheme } from '@react-navigation/native';

import ButtonCard from '!/components/ButtonCard';
import Row from '!/components/Row';
import Searchbar from '!/components/Searchbar';
import Text from '!/components/Text';
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

        <Row>
          <ButtonCard resource='pokemons' />
          <ButtonCard resource='moves' right />
        </Row>
        <Row>
          <ButtonCard resource='abilities' />
          <ButtonCard resource='items' right />
        </Row>
        <Row>
          <ButtonCard bottom resource='locations' />
          <ButtonCard bottom resource='typeCharts' right />
        </Row>
      </View>
    </ScrollView>
  );
};

export default Home;
