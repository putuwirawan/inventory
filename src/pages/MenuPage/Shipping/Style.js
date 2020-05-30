import {StyleSheet, Dimensions, Platform} from 'react-native';

const {height} = Dimensions.get('screen');
const height_logo = height * 0.2;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
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
  },
  action: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    margin: 10,
  },
  listDetail: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingBottom: 5,
    marginBottom: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#4C504E',
  },
  listDetail1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  box: {
    flex: 1,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderColor:'#1EDC2D'
  
  },
  dropdown: {
    width: '40%',
  },
});

export default styles;
