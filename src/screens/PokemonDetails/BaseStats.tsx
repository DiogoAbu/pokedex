import React, { FC } from 'react';
import { View } from 'react-native';

import FastImage from 'react-native-fast-image';
import { IPokemon } from 'pokeapi-typescript';

import Text from '!/components/Text';
import { constants } from '!/services/theme';
import { BaseStatNames } from '!/types';

import StatsBar from './StatsBar';
import styles from './styles';

interface Props {
  pokemon: IPokemon;
  displayFooterImage: boolean;
}

const BaseStats: FC<Props> = ({ pokemon, displayFooterImage }) => {
  const baseStats: Record<BaseStatNames, number> = pokemon.stats.reduce((prev, curr) => {
    return { ...prev, [curr.stat.name]: curr.base_stat };
  }, {} as any);

  return (
    <>
      <View style={styles.infoOuterContainer}>
        <View style={styles.infoRowContainer}>
          <View>
            <View style={[styles.infoTextContainer, styles.infoTitleContainer]}>
              <Text>HP</Text>
            </View>
            <View style={[styles.infoTextContainer, styles.infoTitleContainer]}>
              <Text>Attack</Text>
            </View>
            <View style={[styles.infoTextContainer, styles.infoTitleContainer]}>
              <Text>Defense</Text>
            </View>
            <View style={[styles.infoTextContainer, styles.infoTitleContainer]}>
              <Text>Sp. Attack</Text>
            </View>
            <View style={[styles.infoTextContainer, styles.infoTitleContainer]}>
              <Text>Sp. Defense</Text>
            </View>
            <View style={[styles.infoTextContainer, styles.infoTitleContainer]}>
              <Text>Speed</Text>
            </View>
            <View style={[styles.infoTextContainer, styles.infoTitleContainer]}>
              <Text>Total</Text>
            </View>
          </View>

          <View>
            <View style={styles.infoTextContainer}>
              <Text>{baseStats.hp}</Text>
            </View>
            <View style={styles.infoTextContainer}>
              <Text>{baseStats.attack}</Text>
            </View>
            <View style={styles.infoTextContainer}>
              <Text>{baseStats.defense}</Text>
            </View>
            <View style={styles.infoTextContainer}>
              <Text>{baseStats['special-attack']}</Text>
            </View>
            <View style={styles.infoTextContainer}>
              <Text>{baseStats['special-defense']}</Text>
            </View>
            <View style={styles.infoTextContainer}>
              <Text>{baseStats.speed}</Text>
            </View>
            <View style={styles.infoTextContainer}>
              <Text>
                {baseStats.hp +
                  baseStats.attack +
                  baseStats.defense +
                  baseStats['special-attack'] +
                  baseStats['special-defense'] +
                  baseStats.speed}
              </Text>
            </View>
          </View>

          <View style={styles.infoRightStretch}>
            <View style={styles.infoTextContainer}>
              <StatsBar fillColor='#FF5959' stat={baseStats.hp} style={{ marginLeft: constants.grid }} />
            </View>
            <View style={styles.infoTextContainer}>
              <StatsBar fillColor='#F5AC78' stat={baseStats.attack} style={{ marginLeft: constants.grid }} />
            </View>
            <View style={styles.infoTextContainer}>
              <StatsBar fillColor='#FAE078' stat={baseStats.defense} style={{ marginLeft: constants.grid }} />
            </View>
            <View style={styles.infoTextContainer}>
              <StatsBar
                fillColor='#9DB7F5'
                stat={baseStats['special-attack']}
                style={{ marginLeft: constants.grid }}
              />
            </View>
            <View style={styles.infoTextContainer}>
              <StatsBar
                fillColor='#A7DB8D'
                stat={baseStats['special-defense']}
                style={{ marginLeft: constants.grid }}
              />
            </View>
            <View style={styles.infoTextContainer}>
              <StatsBar fillColor='#FA92B2' stat={baseStats.speed} style={{ marginLeft: constants.grid }} />
            </View>
            <View style={styles.infoTextContainer}>
              <StatsBar
                max={255 * 6}
                stat={
                  baseStats.hp +
                  baseStats.attack +
                  baseStats.defense +
                  baseStats['special-attack'] +
                  baseStats['special-defense'] +
                  baseStats.speed
                }
                style={{ marginLeft: constants.grid }}
              />
            </View>
          </View>
        </View>
      </View>

      {displayFooterImage ? (
        <FastImage
          resizeMode='contain'
          source={require('!/assets/magikarp.png')}
          style={styles.footerImage}
        />
      ) : null}
    </>
  );
};

export default BaseStats;
