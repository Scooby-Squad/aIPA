import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  flatview: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'row',
    paddingTop: 30,
    borderRadius: 2
  },
  rating: {
    alignSelf: 'center',
    flexDirection: 'column'
  },
  brewer: {
    opacity: 0.5
  },
  button: {
    color: '#1a8cff'
  }
});
export const space =
  '                                                                       ';
export default styles;
