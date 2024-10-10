import React, { useState, useContext } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import ToggleTheme from '../components/ToggleTheme';
import { ThemeContext } from '../utils/ThemeContext';
import { useFavorites } from './FavoritesContext';
import { Ionicons } from '@expo/vector-icons';
import apiClient from '../utils/API';
import { AuthContext } from '../App';

interface OverviewData {
  overview: {
    income: number;
    monthlyBills: number;
    spending: number;
    remainingBalance: number;
    totalGoalsProgress: number;
    totalGoalsTarget: number;
  };
}
interface HomeScreenProps {
  navigation: StackNavigationProp<any, any>;
}
const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [overviewData, setOverviewData] = useState<OverviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const { theme, setTheme } = useContext(ThemeContext);
  const { favorites } = useFavorites();
  const [showFavorites, setShowFavorites] = useState(false);
  const { user } = useContext(AuthContext);

  const styles = createStyles(theme);

  useFocusEffect(
    React.useCallback(() => {
      apiClient
        .get('http://localhost:9090/api/overview')
        .then((response) => {
          setOverviewData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching overview data:', error);
          setLoading(false);
        });
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.info}>Loading...</Text>
      </View>
    );
  }

  if (!overviewData || !overviewData.overview) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.info}>Failed to load data</Text>
      </View>
    );
  }

  // console.log(overviewData.overview, 'herer line 59');

  const {
    income,
    monthlyBills,
    spending,
    remainingBalance,
    totalGoalsProgress,
    totalGoalsTarget,
  } = overviewData.overview;

  const progress =
    totalGoalsTarget > 0 ? totalGoalsProgress / totalGoalsTarget : 0;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileSection}>
        <Image
          source={{
            uri: 'https://aui.atlassian.com/aui/8.8/docs/images/avatar-person.svg',
          }}
          style={styles.avatar}
        />
        <Text style={styles.welcome}>Hello, {user?.username}!</Text>
      </View>

      <Text style={styles.title}>Account Overview</Text>
      <View style={styles.card}>
        <Text style={styles.info}>Monthly Income: £{income ?? 0}</Text>
        <Text style={styles.info}>Monthly Bills: £{monthlyBills ?? 0}</Text>
        <Text style={styles.info}>Spending: £{spending ?? 0}</Text>
        <Text style={styles.info}>
          Remaining Balance: £{remainingBalance ?? 0}
        </Text>
        {favorites.length > 0 && (
          <View style={styles.favoritesContainer}>
            <TouchableOpacity
              style={styles.favoritesButton}
              onPress={() => setShowFavorites(!showFavorites)}
            >
              <Text style={styles.favoritesButtonText}>
                Favorite Stocks ({favorites.length})
              </Text>
              <Ionicons
                name={showFavorites ? 'chevron-up' : 'chevron-down'}
                size={24}
                color={theme === 'light' ? 'white' : '#9EADAD'}
              />
            </TouchableOpacity>

            {showFavorites && (
              <View style={styles.favoritesList}>
                {favorites.map((stock, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.favoriteButton}
                    onPress={() => navigation.navigate('Stocks')}
                  >
                    <Text key={index} style={styles.favoriteItem}>
                      {stock}{' '}
                      <Ionicons
                        name="trending-up-outline"
                        size={30}
                        color={theme === 'light' ? 'white' : '#9EADAD'}
                      />
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        )}
      </View>

      <Text style={styles.progressTitle}>Savings Goal Progress</Text>
      <View style={{ marginBottom: 35 }}>
        <ProgressBar
          progress={progress}
          color={theme === 'light' ? 'grey' : '#00C293'}
          style={styles.progressBar}
        />
      </View>
      <Text style={styles.progressText}>
        Progress: £{totalGoalsProgress ?? 0} / £{totalGoalsTarget ?? 0}
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Budgets')}
      >
        <Text style={styles.buttonText}>Edit Budgets</Text>
      </TouchableOpacity>

      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <ToggleTheme />
      </View>
    </ScrollView>
  );
};

const createStyles = (theme: string) => {
  return theme === 'light'
    ? StyleSheet.create({
        container: {
          flex: 1,
          padding: 20,
          backgroundColor: '#00C293',
        },
        profileSection: {
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 20,
        },
        avatar: {
          width: 60,
          height: 60,
          borderRadius: 30,
          marginRight: 15,
        },
        welcome: {
          fontSize: 20,
          fontWeight: 'bold',
          color: 'white',
        },
        title: {
          fontSize: 24,
          fontWeight: 'bold',
          marginBottom: 10,

          color: 'white',
        },
        card: {
          padding: 15,
          borderRadius: 10,
          marginBottom: 20,
          shadowColor: '#000',
          shadowOpacity: 0.3,
          shadowRadius: 5,
          elevation: 5,
          borderWidth: 4,

          borderColor: '#fff',
          backgroundColor: '#636363',
        },
        info: {
          fontSize: 26,
          marginBottom: 5,
          color: 'white',
          fontWeight: 400,
          padding: 14,
        },
        progressTitle: {
          fontSize: 16,
          fontWeight: 'bold',
          marginBottom: 10,

          color: 'white',
        },
        progressBar: {
          height: 20,
          borderRadius: 5,
          margin: 5,
        },
        loadingContainer: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
        errorContainer: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
        button: {
          marginTop: 20,
          backgroundColor: 'white',
          paddingVertical: 15,
          borderRadius: 50,
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.2,
          shadowRadius: 5,
          elevation: 6,
        },
        buttonText: {
          fontSize: 18,
          fontWeight: '600',
          color: '#00C293',
        },
        progressText: { color: 'white', fontSize: 18, fontWeight: 700 },
        favoritesContainer: {
          marginTop: 10,
          borderTopWidth: 1,
          borderTopColor: 'rgba(255, 255, 255, 0.3)',
          paddingTop: 10,
        },
        favoritesButton: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 5,
        },
        favoritesButtonText: {
          fontSize: 18,
          color: 'white',
          fontWeight: '500',
        },
        favoritesList: {
          marginTop: 5,
        },
        favoriteItem: {
          fontSize: 30,
          color: 'white',
          paddingVertical: 5,
        },
      })
    : StyleSheet.create({
        container: {
          flex: 1,
          padding: 20,

          backgroundColor: 'grey',
        },
        profileSection: {
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 20,
        },
        avatar: {
          width: 60,
          height: 60,
          borderRadius: 30,
          marginRight: 15,
        },
        welcome: {
          fontSize: 20,
          fontWeight: 'bold',

          color: 'black',
        },
        title: {
          fontSize: 24,
          fontWeight: 'bold',
          marginBottom: 10,

          color: 'black',
        },
        card: {
          padding: 15,
          borderRadius: 10,
          marginBottom: 20,
          shadowColor: '#000',
          shadowOpacity: 0.3,
          shadowRadius: 5,
          elevation: 5,
          borderWidth: 4,

          borderColor: '#00C293',
          backgroundColor: 'black',
        },
        info: {
          fontSize: 26,
          marginBottom: 5,
          color: '#9EADAD',
          fontWeight: 400,
          padding: 14,
        },
        progressTitle: {
          fontSize: 16,
          fontWeight: 'bold',
          marginBottom: 10,

          color: 'black',
        },
        progressBar: {
          height: 20,
          borderRadius: 5,
          margin: 5,
        },

        loadingContainer: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },

        errorContainer: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
        button: {
          marginTop: 20,
          backgroundColor: 'black',
          paddingVertical: 15,
          borderRadius: 50,
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.2,
          shadowRadius: 5,
          elevation: 6,
        },
        buttonText: {
          fontSize: 18,
          fontWeight: '600',
          color: '#9EADAD',
        },
        progressText: { color: 'black', fontSize: 18, fontWeight: 700 },
        favoritesContainer: {
          marginTop: 10,
          borderTopWidth: 1,
          borderTopColor: 'rgba(158, 173, 173, 0.3)',
          paddingTop: 10,
        },
        favoritesButton: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 5,
        },
        favoritesButtonText: {
          fontSize: 18,
          color: '#9EADAD',
          fontWeight: '500',
        },
        favoritesList: {
          marginTop: 5,
        },
        favoriteItem: {
          fontSize: 30,
          color: '#9EADAD',
          paddingVertical: 5,
        },
      });
};
export default HomeScreen;
