import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { BackHandler, FlatList, TextInput, View } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';

import Searchbar from '!/components/Searchbar';
import Separator from '!/components/Separator';
import Text from '!/components/Text';
import useDebounceValue from '!/hooks/use-debounce-value';
import useFocusEffect from '!/hooks/use-focus-effect';
import useMethod from '!/hooks/use-method';
import useTeam from '!/hooks/use-team';
import ButtonCard from '!/screens/Home/ButtonCard';
import { constants } from '!/services/theme';

import PokemonTeamItem from './PokemonTeamItem';
import SearchList from './SearchList';
import styles from './styles';

const Home: FC = () => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const teams = useTeam(undefined);

  const searchbarRef = useRef<TextInput>(null);
  const [isSearchbarFocused, setIsSearchbarFocused] = useState(false);
  const [isSearchbarLoading, setIsSearchbarLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchQueryDebounced = useDebounceValue(searchQuery);

  const handleSearchChangeText = useCallback((text: string) => {
    setSearchQuery(text);
  }, []);

  const handleSearchFocus = useMethod(() => {
    setIsSearchbarFocused(true);
    requestAnimationFrame(() => {
      searchbarRef.current?.focus();
    });
  });

  const handleSearchBlur = useMethod(() => {
    setIsSearchbarFocused(false);
    setSearchQuery('');
  });

  const handleSearchBackIconPress = useMethod(() => {
    requestAnimationFrame(() => {
      searchbarRef.current?.blur();
    });
  });

  useEffect(() => {
    setIsSearchbarLoading(!!searchQuery);
  }, [searchQuery]);

  useFocusEffect(() => {
    const backHandlerListener = BackHandler.addEventListener('hardwareBackPress', () => {
      if (isSearchbarFocused) {
        searchbarRef.current?.blur();
        return true;
      }
      return false;
    });

    return () => {
      backHandlerListener.remove();
    };
  }, [isSearchbarFocused]);

  return !isSearchbarFocused ? (
    <FlatList
      contentContainerStyle={[
        styles.contentContainer,
        {
          paddingBottom: insets.bottom + constants.gridSmall,
          paddingLeft: insets.left + constants.gridSmall,
          paddingRight: insets.right + constants.gridSmall,
          paddingTop: insets.top + constants.gridSmall,
        },
      ]}
      data={teams}
      ItemSeparatorComponent={() => <Separator style={styles.pokemonTeamSeparator} />}
      keyboardShouldPersistTaps='always'
      ListEmptyComponent={
        <Text style={styles.pokemonTeamEmptyText} testID='team-list-empty'>
          No team yet, go capture a Pokémon!
        </Text>
      }
      ListHeaderComponent={
        <>
          <View
            style={[
              styles.headerContainer,
              {
                backgroundColor: colors.card,
                // Return view to normal position to be behind the statusbar
                marginLeft: -(insets.left + constants.gridSmall),
                marginRight: -(insets.right + constants.gridSmall),
                marginTop: -(insets.top + constants.gridSmall),
                paddingLeft: insets.left + constants.grid,
                paddingRight: insets.right + constants.grid,
                paddingTop: insets.top + constants.grid,
              },
            ]}
          >
            <Text style={[styles.headerTitle, { marginBottom: constants.grid }]} testID='home-title'>
              What are you looking for?
            </Text>

            <Searchbar
              editable={false}
              focusable={false}
              onContainerPress={handleSearchFocus}
              rejectResponderTermination
            />

            <View style={{ marginVertical: constants.gridBig }}>
              <View style={styles.headerRow}>
                <ButtonCard resource='pokemons' />
                <ButtonCard disabled resource='moves' right />
              </View>
              <View style={styles.headerRow}>
                <ButtonCard disabled resource='abilities' />
                <ButtonCard disabled resource='items' right />
              </View>
              <View style={styles.headerRow}>
                <ButtonCard bottom disabled resource='locations' />
                <ButtonCard bottom disabled resource='typeCharts' right />
              </View>
            </View>
          </View>

          <Text style={styles.pokemonTeamMainTitle}>Your teams</Text>
        </>
      }
      renderItem={(props) => <PokemonTeamItem {...props} />}
      style={{ backgroundColor: colors.border }}
    />
  ) : (
    <>
      <View
        style={[
          styles.headerContainer,
          {
            backgroundColor: colors.card,
            // Return view to normal position to be behind the statusbar
            paddingBottom: constants.grid,
            paddingLeft: insets.left + constants.grid,
            paddingRight: insets.right + constants.grid,
            paddingTop: insets.top + constants.grid,
          },
        ]}
      >
        <Searchbar
          isLoading={isSearchbarLoading}
          onBlur={handleSearchBlur}
          onChangeText={handleSearchChangeText}
          onIconPress={isSearchbarFocused ? handleSearchBackIconPress : undefined}
          ref={searchbarRef}
          showBackButton={isSearchbarFocused}
          value={searchQuery}
        />
      </View>

      <SearchList searchQuery={searchQueryDebounced} setIsSearchbarLoading={setIsSearchbarLoading} />
    </>
  );
};

export default Home;
