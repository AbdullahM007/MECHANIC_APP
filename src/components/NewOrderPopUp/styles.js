import { StyleSheet } from "react-native";
const styles= StyleSheet.create({
    root:{
        position:"absolute",
        width:'100%',
        bottom:0,
        padding:20,
        height:'100%',
        justifyContent:"space-between",
        backgroundColor:'#00000099'
    },
    popUpContainer:{
        backgroundColor:'black',
        height:250,
        borderRadius:10,
        alignItems:"center",
        justifyContent:"space-around",
    },
    row:{
        flexDirection:"row" ,
        alignItems:"center",
    },
    minutes:{
        color:'lightgrey',
        fontSize:36,
    },
    distance:{
        color:'lightgrey',
        fontSize:26,
    },
    serviceType:{
        color:'lightgrey',
        fontSize:26,
        marginHorizontal:10,
    },
    userBg:{
        backgroundColor:'#008bff',
        width:60,
        height:60,
        borderRadius:60,
        alignItems:"center",
        justifyContent:"center",
    },
    declineButton:{
     backgroundColor:'black',
     padding:20,
     borderRadius:50,
     width:100,
     alignItems:"center",
    },
    declineText:{ 
        color:'white',
        fontWeight:"bold"

    },


});
export default styles;