import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import ConnectButton from '@/components/Connect/ConnectButton';
import { Web3Modal } from "@web3modal/wagmi-react-native";
import Points from '@/components/dashboard/Points';
import Transactions from '@/components/dashboard/Transactions';
import ClaimPoints from '@/components/dashboard/ClaimPoints';

export default function DashboardPage() {
  return (
    <View style={styles.container}>
      <View style={styles.section1}>
        <View style={styles.header}>
          <Text style={styles.title}>Points</Text>
          <ConnectButton />
          {/* <ClaimPoints /> */}
        </View>
        {/* <Points /> */}
      </View>
      <View style={styles.section2}>
        <Text style={styles.title}>Transactions</Text>
        {/* <Transactions /> */}
      </View>
      <Web3Modal />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  section1: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', 
  },
  section2: {
    flex: 1,
  },
});
