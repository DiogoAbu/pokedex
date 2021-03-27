import React, { FC } from 'react';
import { View } from 'react-native';

import FastImage from 'react-native-fast-image';
import { IPokemon, IPokemonSpecies } from 'pokeapi-typescript';

import Icon from '!/components/Icon';
import Text from '!/components/Text';
import { constants } from '!/services/theme';
import capitalize from '!/utils/capitalize';
import cmToFeet from '!/utils/cm-to-feet';
import getGenderPercent from '!/utils/get-gender-percent';
import kgToLbs from '!/utils/kg-to-lbs';

import styles from './styles';

interface Props {
  pokemon: IPokemon;
  species: IPokemonSpecies;
  displayFooterImage: boolean;
}

const About: FC<Props> = ({ pokemon, species, displayFooterImage }) => {
  const heightInM = pokemon.height / 10;
  const weightInKg = pokemon.weight / 10;
  const genderPercent = getGenderPercent(species.gender_rate);

  return (
    <>
      <View style={styles.infoOuterContainer}>
        <View style={styles.infoRowContainer}>
          <View>
            <View style={[styles.infoTextContainer, styles.infoTitleContainer]}>
              <Text>Category</Text>
            </View>
            <View style={[styles.infoTextContainer, styles.infoTitleContainer]}>
              <Text>Height</Text>
            </View>
            <View style={[styles.infoTextContainer, styles.infoTitleContainer]}>
              <Text>Weight</Text>
            </View>
            <View style={[styles.infoTextContainer, styles.infoTitleContainer]}>
              <Text>Abilities</Text>
            </View>

            <View style={styles.infoTextContainer}>
              <Text style={styles.infoSectionTitle}>Breeding</Text>
            </View>
            <View style={[styles.infoTextContainer, styles.infoTitleContainer]}>
              <Text>Gender</Text>
            </View>
            <View style={[styles.infoTextContainer, styles.infoTitleContainer]}>
              <Text>Egg Groups</Text>
            </View>
            <View style={[styles.infoTextContainer, styles.infoTitleContainer]}>
              <Text>Habitat</Text>
            </View>
          </View>

          <View>
            <View style={styles.infoTextContainer}>
              <Text>{species.genera.find((e) => e.language.name === 'en')?.genus}</Text>
            </View>
            <View style={styles.infoTextContainer}>
              <Text>
                {heightInM} m ({cmToFeet(pokemon.height)})
              </Text>
            </View>
            <View style={styles.infoTextContainer}>
              <Text>
                {weightInKg} kg ({kgToLbs(weightInKg)})
              </Text>
            </View>
            <View style={styles.infoTextContainer}>
              <Text>
                {pokemon.abilities.reduce((prev, curr, index) => {
                  return prev + (index !== 0 ? ', ' : '') + capitalize(curr.ability.name, true)!;
                }, '')}
              </Text>
            </View>

            <View style={styles.infoTextContainer}>
              <Text style={styles.infoSectionTitle}> </Text>
            </View>
            <View style={styles.infoTextContainer}>
              {genderPercent ? (
                <>
                  <Text>
                    <Icon name='gender-female' size={16} />
                    {genderPercent.female.toFixed(1) + '%'}
                  </Text>
                  <Text style={{ marginLeft: constants.grid }}>
                    <Icon name='gender-male' size={16} /> {genderPercent.male.toFixed(1) + '%'}
                  </Text>
                </>
              ) : (
                <Text>None/Unknown</Text>
              )}
            </View>
            <View style={styles.infoTextContainer}>
              <Text>
                {species.egg_groups.reduce((prev, curr, index) => {
                  return prev + (index !== 0 ? ', ' : '') + capitalize(curr.name, true)!;
                }, '')}
              </Text>
            </View>
            <View style={styles.infoTextContainer}>
              <Text>{species.habitat ? capitalize(species.habitat.name, true) : 'Unknown'}</Text>
            </View>
          </View>
        </View>
      </View>

      {displayFooterImage ? (
        <FastImage resizeMode='contain' source={require('!/assets/pikachu.png')} style={styles.footerImage} />
      ) : null}
    </>
  );
};

export default About;
