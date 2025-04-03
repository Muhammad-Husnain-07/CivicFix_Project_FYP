import React from 'react';
import { StyleSheet} from 'react-native';
import {ThemedView} from './ThemedView';
import {ThemedText} from './ThemedText';
import {useThemeColor} from '@/hooks/useThemeColor';
import ThemedBadge from './ThemedBadge';

const ThemedCard = ({data, style, lightColor, darkColor, ...rest}) => {
  const borderColor = useThemeColor({light: lightColor, dark: darkColor}, 'border');
  const statusColor=()=>{
    if(data?.status?.toLowerCase() === 'pending'){
      return 'warning';
    } else if(data?.status?.toLowerCase() === 'resolved'){
      return 'success';
    } else if(data?.status?.toLowerCase() === 'closed'){
      return 'danger';
    } else {
      return 'info';
    }
  }
  return (
    <ThemedView style={[{borderColor}, styles.card]}>
      <ThemedText style={styles.title}>{data?.title || 'No Title'}</ThemedText>
      {data?.status ? (
        <ThemedView style={styles.rightSection}>
          <ThemedBadge status={statusColor()} >Status: {data?.status}</ThemedBadge>
        </ThemedView>
      ) : null}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderRadius: 8,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
  },
  rightSection: {
    flex: 1,
    alignItems: 'flex-end',
  },
});

export default ThemedCard;
