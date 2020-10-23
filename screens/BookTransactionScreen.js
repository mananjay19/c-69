import React from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';

export default class TransactionScreen extends React.Component {
  constructor(){
    super()
     this.state={
       hasCameraPermission: null,
       scaned:false,
       scanedData:'',
       buttonState:'normal'
     }
    
  }
  getCameraPermission=async()=>{
    const {status}=await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission:status==='granted',
      buttonState:'clicked',
      scaned:false
    })
  }
  hasBarScan=async({type,data})=>{
    this.setState({
      scaned:true,
      scanedData:data,
      buttonState:'normal'
    })
  }
    render() {
      const hasCameraPermission=this.state.hasCameraPermission;
      const scaned=this.state.scaned;
      const buttonState=this.state.buttonState;
      if (buttonState==='clicked' && hasCameraPermission){
        return(
          <BarCodeScanner
          onBarCodeScanned={scaned?undefined:this.hasBarScan}
          ></BarCodeScanner>
        )
      }
      else if(buttonState==='normal') {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>{
            hasCameraPermission===true ? this.state.scanedData:'Request camera Permission'}
          </Text>
          <TouchableOpacity
onPress={()=>{this.getCameraPermission()}}
          >
            <Text>Scan Qr code</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}