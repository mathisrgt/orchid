import { W3mButton } from "@web3modal/wagmi-react-native";
import { View } from "react-native";

export default function ConnectButton() {
 return (
  <View>
   {/* Customizing the web3modal button requires passing it certain props */}
   <W3mButton

    accountStyle={{
     backgroundColor: "#FB9492",
    }}
   />
  </View>
 );
}