import React from 'react';
import { Components } from 'exponent';
import { Text } from 'react-native';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';

const getAve = (array) => {
  const sum = array.reduce((a, b) => a + b);
  return sum / array.length;
};

const getLatLon = (users) => {
  const usersArray = _.map(users, (val, uid) => {
    return { ...val, uid };
  });
  const latArray = usersArray.map(user => user.lat);
  const lonArray = usersArray.map(user => user.lon);
  const lat = getAve(latArray);
  const lon = getAve(lonArray);
  return { lat, lon };
};

export default class Map extends React.Component {
  renderVenues(status, venues, location) {
    if (status === 'voting') {
      return venues.map((venue, i) => {
        if (!venue.lat || !venue.lon) {
          return <Text key={i} />;
        }
        return (
        <Components.MapView.Marker
          key={venue.uid}
          coordinate={{
            latitude: venue.lat,
            longitude: venue.lon,
          }}
          pinColor="#007aff"
          title={venue.name}
          description={venue.formattedAddress[0]}
        />
      );
    });
    } else if (status === 'set') {
      return (
        <Components.MapView.Marker
          key={location.uid}
          coordinate={{
            latitude: location.lat,
            longitude: location.lon,
          }}
          pinColor="#007aff"
          title={location.name}
          description={location.formattedAddress[0]}
        />
      );
    }
    return;
  }

  render

  render() {
    const { meetup } = this.props;
    const { users, status, location } = meetup;
    const { lat, lon } = getLatLon(users);
    const venues = _.map(meetup.venues, (val, uid) => {
      return { ...val, uid };
    });
    return (
      <Components.MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: lat,
          longitude: lon,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        loadingEnabled
      >
        <Components.MapView.Marker
          coordinate={{
            latitude: lat,
            longitude: lon,
          }}
          pinColor="green"
          title="Middle Location"
          description="This point is the central location between attendees."
        />
        {this.renderVenues(status, venues, location)}
      </Components.MapView>
    );
  }
}
