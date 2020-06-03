import {StyleSheet, Dimensions, Platform} from 'react-native';

const {height} = Dimensions.get('screen');
const height_logo = height * 0.2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section_center: {
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  textSearch: {
    marginTop: Platform.OS === 'ios' ? 0 : 2,
    paddingLeft: 5,
    height: 30,
    width: 200,
  },
  textHeader: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  textSubHeader: {
    fontSize: 17,
    fontWeight: 'bold',
    fontStyle:'italic'
  },

  dropdown: {
    width: '40%',
  },
});

export default styles;
