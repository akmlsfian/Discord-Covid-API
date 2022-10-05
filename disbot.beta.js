const Discord = require("discord.js");
const bot = new Discord.Client();
const { TOKEN } = require('./process.json');
const covid = require('novelcovid');
const repeat = require('node-cron');

//++++++++++++++++++++++++++++++++PKPDAY SCRIPT+++++++++++++++++++++++++++++++++++++

var d = new Date();
var curday = d.getDate();
var curmonth = 1+(d.getMonth());
var arrmonth = d.getMonth();
var years = d.getFullYear();
var days;
var daycount=1;

function time(){

  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();

  m = checkTime(m);
  s = checkTime(s);

  return h +":" +m +":" +s;

}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
  }

  function Calender(d,m,y){

    var montharray = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
        ];

    return d +" " +montharray[m] +" " +y;
  }

    var RealDate = Calender(curday, arrmonth, years);



//++++++++++++++++++++++++++++++++++++++++BOOTING+++++++++++++++++++++++++++++++++++

bot.on('ready', async() => {
    console.log("Jeng Jeng Pale Pale! Kalau tak leh run jgn roger \n");
    console.log("Time Launch : [" +time() +"]");

        //--------------------RETRIEVED FROM API WEB ON BOOT--------------------------

        const CovidStatus = await covid.countries({country:'Malaysia'})
        var Cases = CovidStatus.cases.toLocaleString();
        var Daycase = CovidStatus.todayCases.toLocaleString();
        var Deaths = CovidStatus.deaths.toLocaleString();
        var Daydeath = CovidStatus.todayDeaths.toLocaleString();
        var Recovered = CovidStatus.recovered.toLocaleString();
        var Active = CovidStatus.active.toLocaleString();
        var Critical = CovidStatus.critical.toLocaleString();


    console.log("=============\n" +"DATE: " +RealDate +"\n" +"CASES: " + Cases +"\n" +"DAY_CASES: " + Daycase +"\n" +"DEATHS: " +  Deaths +"\n"
    +"DAY_DEATH: " + Daydeath +"\n" +"RECOVERED: " + Recovered +"\n" +"ACTIVE: " + Active +"\n" +"CRITICAL: " + Critical +"\n");

});

//-----------------------------------------------------------------------------------
//++++++++++++++++++++++++++++++++CHANGE CHANNELS NAME ON BOOT+++++++++++++++++++++++


bot.on('ready', async() => {
    repeat.schedule('* * * * * *', async() =>{
        console.log('=ONLINE=')

//----------------------------CHANGE CHANNEL NAME-------------------------------

let server = bot.guilds.cache.get('705276380459302943'); //SERVER'S ID
let Date = server.channels.cache.get('839405154063220756');
Date.setName(RealDate);

let Caseday = server.channels.cache.get('779724882685853706'); //PUT CHANNEL's ID TO PUT (CASE DAY)
Caseday.setName('Today Cases: ' + await GetDayCasesMal());

let Deathday = server.channels.cache.get('779725022499307540'); //PUT CHANNEL's ID TO PUT (DEATH DAY)
Deathday.setName('Today Death: ' + await GetDayDeathsMal());

    });

});



    //++++++++++++++++++++++++++++++++READ USERS MESSAGE++++++++++++++++++++++++++++++++
    //+++++++++++++++++++++++++++++++AND SEND COVID DATA++++++++++++++++++++++++++++++++

//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
//====================================================================
//=================== FUNCTIONS TO RETRIEVE COVID DATA ===============
//================== AND ALWAYS KEPT UPDATING THE DATA ===============
//====================================================================
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx


//xxxxxxxxxxxxxxxxxxxx WORLD xxxxxxxxxxxxxxxxxxxxxxxxxx


    async function GetCasesWorld(){
        
                const CovidStatus = await covid.all();
                var x = CovidStatus.cases.toLocaleString();
                return x;
            
    }

    async function GetDayCasesWorld(){
        
                const CovidStatus = await covid.all();
                var x = CovidStatus.todayCases.toLocaleString();
                return x;
            
    }

    async function GetDeathsWorld(){
        
                const CovidStatus = await covid.all();
                var x = CovidStatus.deaths.toLocaleString();
                return x;
            
    }

    async function GetDayDeathsWorld(){
        
                const CovidStatus = await covid.all();
                var x = CovidStatus.todayDeaths.toLocaleString();
                return x;
            
    }

    async function GetRecoveredWorld(){
       
                const CovidStatus = await covid.all();
                var x = CovidStatus.recovered.toLocaleString();
                return x;
            

    }

    async function GetActiveWorld(){
        
                const CovidStatus = await covid.all();
                var x = CovidStatus.active.toLocaleString();
                return x;
            
    }

    async function GetCriticalWorld(){
        
                const CovidStatus = await covid.all();
                var x = CovidStatus.critical.toLocaleString();
                return x;
            
    }
   

    //xxxxxxxxxxxxxxxxxxxx WORLD ALGO END xxxxxxxxxxxxxxxxxxxxxxxxxx

    //--------------------------------------------------------------

    //xxxxxxxxxxxxxxxxxxxx MALAYSIA xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

    async function GetCasesMal(){
        
        const CovidStatus = await covid.countries({country:'Malaysia'})
        var x = CovidStatus.cases.toLocaleString();
        return x;
    
    }

    async function GetDayCasesMal(){

        const CovidStatus = await covid.countries({country:'Malaysia'})
            var x = CovidStatus.todayCases.toLocaleString();
            return x;
        
    }

    async function GetDeathsMal(){

        const CovidStatus = await covid.countries({country:'Malaysia'})
            var x = CovidStatus.deaths.toLocaleString();
            return x;
        
    }

    async function GetDayDeathsMal(){

        const CovidStatus = await covid.countries({country:'Malaysia'})
            var x = CovidStatus.todayDeaths.toLocaleString();
            return x;
        
    }

    async function GetRecoveredMal(){

        const CovidStatus = await covid.countries({country:'Malaysia'})
            var x = CovidStatus.recovered.toLocaleString();
            return x;
        

    }

    async function GetActiveMal(){

        const CovidStatus = await covid.countries({country:'Malaysia'})
            var x = CovidStatus.active.toLocaleString();
            return x;
        
    }

    async function GetCriticalMal(){

        const CovidStatus = await covid.countries({country:'Malaysia'})
            var x = CovidStatus.critical.toLocaleString();
            return x;
        
    }


    //xxxxxxxxxxxxxxxx MALAYSIA ALGO END xxxxxxxxxxxxxxxxxxxxxxxxxxx

//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
//================================================================================
//================================== INPUT USER ==================================
//=============================== TO OUTPUT STATS ================================
//==================================== AT MSG ====================================
//================================================================================
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx


//*-----------------(( MALAYSIA ))--------------------    
bot.on('message', async message => {

     //----COMMAND TO OUTPUT TO THE DISCORD-------------------------
        const prefix1 = "!mal";
        if(message.content.startsWith(prefix1)) {

            console.log("[" +time() +"] == USER INPUT - !mal ==");
            
            var randomCol = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);

            return message.channel.send(new Discord.MessageEmbed()
                .setColor(randomCol)
                .setTitle("-         Covid 19 : Malaysia         -")
                .setTimestamp()
                .addFields(
                    { name: "Cases", value: await GetCasesMal() , inline: true },
                    { name: "Today Cases", value: await GetDayCasesMal(), inline: true },
                    { name: "Deaths", value: await GetDeathsMal(), inline: true },
                    { name: "Today Deaths", value: await GetDayDeathsMal(), inline: true },
                    { name: "Recovered", value: await GetRecoveredMal(), inline: true },
                    { name: "Active", value: await GetActiveMal(), inline: true },
                    { name: "ICU", value: await GetCriticalMal(), inline: true }
                    
                 )
                    .setFooter("By: LUCI X akmlsfian")
                    
            )
         }
    
});


//*-------------(( INTERNATIONAL ))--------------------  

    bot.on('message', async message => {

     //----COMMAND TO OUTPUT TO THE DISCORD-------------------------
        const prefix2 = "!world";
        if(message.content.startsWith(prefix2)) {

            console.log("[" +time() +"] == USER INPUT - !world ==");
            
            var randomCol = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);

            return message.channel.send(new Discord.MessageEmbed()
                .setColor(randomCol)
                .setTitle("-         Covid 19 : International         -")
                .setTimestamp()
                .addFields(
                    { name: "Cases", value: await GetCasesWorld() , inline: true },
                    { name: "Today Cases", value: await GetDayCasesWorld(), inline: true },
                    { name: "Deaths", value: await GetDeathsWorld(), inline: true },
                    { name: "Today Deaths", value: await GetDayDeathsWorld(), inline: true },
                    { name: "Recovered", value: await GetRecoveredWorld(), inline: true },
                    { name: "Active", value: await GetActiveWorld(), inline: true },
                    { name: "ICU", value: await GetCriticalWorld(), inline: true },
                 )
                    .setFooter("By: LUCI X akmlsfian")
                    
                )
            }
            
        });



//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
//================================================================================
//============================ END OF THE OUTPUT ALGO ============================
//================================================================================
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx



bot.login(TOKEN);

