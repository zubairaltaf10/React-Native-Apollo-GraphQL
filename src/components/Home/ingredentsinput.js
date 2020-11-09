import React from "react";
import { View, Text, Image } from "react-native";
import { width, height } from "react-native-dimension";
import { Toast } from "native-base";
import { withAuth } from "../../store/hoc/withAuth";
class InGredentsInput extends React.Component {

  constructor(props) {
    super(props);
  }

render() {
    return (
      // <View style={{ flex: 1, paddingTop:"50%"  }}>
        
      //  <Text style={{ textAlign: "center" , textAlignVertical: "center" }}>App Home, TBC </Text>
      // </View>

<Content style={styles.container}>
        <View style={styles.topheader}>
            <Text style={styles.backarrowforgot}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
            <Icon name="md-arrow-back" style={styles.icon} type="Ionicons" />
          </TouchableOpacity>
            </Text>
            <View style={{flex: 3, marginLeft:60, alignItems: 'flex-start', marginTop:'10%'}}>
        
            <Text style={styles.topheadingLabel}>
              Forgot Password
            </Text>
              </View>
        </View>
          <Form style={styles.form}>
          
            <Text style={styles.topLabel}>
            Enter your email address to receive a verification code.
            </Text>
            <Input
              placeholder="Email"
              keyboardType="email-address"
              value={this.state.formData.email}
              style={[ApplicationStyles.textbox, {marginTop: '15%'}]}
              onChangeText={email => this.setState({formData: {email}})}
            />

            <PrimaryButton
              title="SEND VERIFICATION CODE"
              marginTop={6}
              disabled={isBtnDisabled}
              loading={this.state.loading}
              onPress={this.handleContinueBtn}
            />
          </Form>
        </Content>

    );
  }
}
export default withAuth(InGredentsInput);