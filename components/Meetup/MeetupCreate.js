import React, { Component } from 'react';
import firebase from 'firebase';
import moment from 'moment';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Text, Alert } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { meetupChange, resetMeetup } from '../../actions';
import { Card, CardSection, Input, Button } from '../common';

class MeetupCreate extends Component {

  componentDidMount() {
    if (!this.props.loggedIn) {
      Actions.login({ type: 'reset' });
      return;
    }
    this.props.resetMeetup();
  }

  onButtonPress() {
    if (this.props.name === '' || this.props.description === '') {
      Alert.alert('Please include a name and description.');
      return;
    }
    Actions.addLocation();
  }

  onChange(prop, value) {
    this.props.meetupChange(prop, value);
  }

  render() {
    const start = moment().add(1, 'hour').format('YYYY-MM-DD HH:mm');

    return (
      <Card>
        <CardSection>
          <Input
            label="Name"
            placeholder="Sarah's Birthday"
            value={this.props.name}
            onChangeText={value => this.onChange('name', value)}
          />
        </CardSection>

        <CardSection>
          <Input
            multiline
            label="Description"
            placeholder="Bring cake and presents"
            value={this.props.description}
            onChangeText={value => this.onChange('description', value)}
          />
        </CardSection>

        <CardSection style={{ alignItems: 'center' }}>
          <Text style={styles.pickerTextStyle}>Start</Text>
          <DatePicker
            style={{ flex: 2 }}
            date={this.props.start}
            minDate={start}
            mode="datetime"
            format="YYYY-MM-DD HH:mm"
            confirmBtnText="Choose"
            cancelBtnText="Cancel"
            onDateChange={(value) => this.onChange('start', value)}
          />
        </CardSection>

        <CardSection style={{ alignItems: 'center' }}>
          <Text style={styles.pickerTextStyle}>End</Text>
          <DatePicker
            style={{ flex: 2 }}
            date={this.props.end}
            minDate={this.props.start}
            mode="datetime"
            format="YYYY-MM-DD HH:mm"
            confirmBtnText="Choose"
            cancelBtnText="Cancel"
            onDateChange={(value) => this.onChange('end', value)}
          />
        </CardSection>

        <CardSection>
          <Button
            onPress={this.onButtonPress.bind(this)}
          >
            Next
          </Button>
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  pickerTextStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1
  }
};

const mapStateToProps = ({ meetupForm, auth }) => {
  const { name, description, start, end } = meetupForm;
  const { loggedIn } = auth;
  return { name, description, start, end, loggedIn };
};

export default connect(mapStateToProps, { meetupChange, resetMeetup })(MeetupCreate);
