import { StyleSheet } from "react-native";
import { color } from "../../../../constant";
import { width } from "../../../../utils/Constant";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
    alignItems: 'center',
  },
  backBtn: {
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 10,
    backgroundColor: color.lightBg,
    borderRadius: 10,
  },
  backIcon: {
    width: 16,
    height: 16,
    tintColor: color.primary,
  },
  mainImage: {
    width: width * 0.9,
    height: width * 0.9,
    borderRadius: 16,
    marginTop: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: color.text,
    marginTop: 20,
    width:"95%"
    // textAlign:'left'
  },
  subtitle: {
    fontSize: 14,
    color: color.gray,
    marginTop: 8,
    paddingHorizontal: 10,
    width:"95%"

  },
  controlsContainer: {
    flexDirection: 'row',
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
  },
  icon: {
    width: 24,
    height: 24,
    // tintColor: color.primary,
  },
  playButton: {
    // backgroundColor: color.primary,
    padding: 0,
    borderRadius: 50,
  },
  playIcon: {
    width: 55,
    height: 55,
    // tintColor: '#fff',
  },
});
