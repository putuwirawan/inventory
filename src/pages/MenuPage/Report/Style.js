import {StyleSheet, Dimensions, Platform} from 'react-native';

const {height} = Dimensions.get('screen');
const height_logo = height * 0.2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerHeader: {
    flex: 2,
    alignContent: 'flex-start',
    borderBottomWidth: 2,
    paddingBottom: 5,
  },
  section_DatePicker: {justifyContent: 'space-between', flexDirection: 'row'},
  section_center: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container_DropDown :{
    width: 180,
    height: 55,
    marginHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: '#17ad94',
  },
  calenderStyle:{
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#5505a6',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 10,
    marginHorizontal: 5,
    backgroundColor: '#d2c1e3',
  },
  section_Radio : {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    
    borderRadius: 10,
    padding: 5,
    margin: 5,
  },
  section_DropDown: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 50,
    marginVertical:5,
  },
  dropDownStyle:{
    width: '30%',
    borderWidth: 1,
    borderRadius: 10,
    height: 35,
    padding: 2,
  },
  textCalender: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
    paddingRight: 5,
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
    fontStyle: 'italic',
  },

  dropdown: {
    width: '40%',
  },
});

export default styles;
