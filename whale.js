// Field bindings
const selectServer = document.getElementById('server');
const selectEndDate = document.getElementById('banner-end-date');
const inputCurrentCrystals = document.getElementById('in-current-crystals');
const checkboxMonthlypass = document.getElementById('monthly-pass');
const checkboxactivities= document.getElementById('activities');
const selectSOSbracket= document.getElementById('SOS-bracket');


selectServer.addEventListener('change', determineServer);
selectEndDate.addEventListener('change', determineDaysUntilEnd);
inputCurrentCrystals.addEventListener('change', setCurrentCrystals);
checkboxMonthlypass.addEventListener('change',setMonthlypass);
checkboxactivities.addEventListener('change',setActivities);
selectSOSbracket.addEventListener('change',setSOSbracket);

// Constants
const SOSbracketType = {
    five:0,
    four: 1,
    three: 2,
    two: 3,
    one: 4
};
const DailyLoginCard = [1,2,4,5,6,7,10];
const serverType = {"CN":0,"TW":1,"KR":2};

// variables
var server = serverType.CN;
var enddate = new Date();
var totalcrystals = 0;
var DaysLeft = 0;
var patchleft = 0;
var RaidLeft = 0;
var patch_to_today = 0;

var bracket = SOSbracketType.five;
var monthlypass = false;
var Activities = false;

var CurrentCrystals = 0;
var MissionReward = 0;
var ComissionReward = 0;
var activitiesReward = 0;
var MonthlyPassReward = 0;
var SOSBracketReward = 0;
var SOSReward = 0;
var GuildRaidReward = 0;
var CharacterTrialReward = 0;
var VersionLoginReward = 0;
var MonthlyShopReward = 0;
var MailReward = 0;
var VersionCodeReward = 0;



// Functions

function updateCalculations(){
    determineMonthlyPassReward(DaysLeft);
    determineDailyMissionReward(DaysLeft);
    determineDailyCommissionReward(DaysLeft);
    determineActivitiesReward(DaysLeft);
    determineRaidLeft(DaysLeft);
    determineTrialReward(DaysLeft);
    determineMailReward(DaysLeft);
    determineMonthlyShopReward(DaysLeft);
    determineVersionLoginReward(DaysLeft);
    determineSOSrewards();
    determineSOSbracketrewards();
    determineVersionCodeReward();
    determineTotalCrystalRewards();
}

function determineDaysUntilEnd(e){
    
    let Days_Until_End = 0;

    // Fetch selected end date
    enddate = new Date(e.target.value);
    let EndDate = new Date(e.target.value);

    // Find the amount of days, N, between now and the end date
    let Today = new Date();
    Today.setHours(0,0,0,0);
    let Today_to_EndDate = EndDate - Today; // Time difference in msec

    // Convert to days (1000msec per second)(60 sec per min)(60 min per hour)(24 hr per day)
    if (Today_to_EndDate > 0){
        Days_Until_End = Math.ceil(Today_to_EndDate / (1000*60*60*24));
    }

    // Output
    document.getElementById('days-until-end').innerText = Days_Until_End + " days left";
    DaysLeft = Days_Until_End;
    determinePatchLeft(DaysLeft);
    updateCalculations();
}

function determineServer(e){
    switch(e.target.value){
        case 'CN':
            server = serverType.CN;
            console.log(server)
            break;
        case 'TW':
            server = serverType.TW;
            console.log(server)
            break;
        case 'KR':
            server = serverType.KR;
            console.log(server)
            break;
    }
    determinePatchLeft(DaysLeft);
    updateCalculations();
}


function determineRaidLeft(d){
    let today = new Date();
    let day = today.getDay();
    let DayToWeek = day > 4 ? 11-day : 4-day;
    let EffectiveDaysLeft = d - DayToWeek;
    RaidLeft = Math.ceil(EffectiveDaysLeft / 7);
    determineRaidReward();
}

function determinePatchLeft(d){
    let today = new Date();
    today.setHours(22,30,0,0);
    let patchday = new Date();
    if (server == serverType.CN){
        patchday = new Date("Wed Jul 31 2024 22:30:00 GMT+0200");
        } 
    if (server == serverType.TW || server == serverType.KR){ 
        patchday = new Date("Wed Aug 7 2024 22:30:00 GMT+0200");
        }
    patch_to_today = today - patchday;
    if (patch_to_today > 0){
        patch_to_today = Math.ceil(patch_to_today / (1000*60*60*24));
        }
    patch_to_today = patch_to_today % 14;
    patchleft = Math.ceil((d - (14 - patch_to_today))/14);
    updateCalculations();
}



function setMonthlypass(e){
    monthlypass = e.target.checked;
    updateCalculations();
}

function setActivities(e){
    Activities = e.target.checked;
    updateCalculations();
}


function setCurrentCrystals(e){
    
    // Output
    document.getElementById('current-crystals').innerText = parseInt(e.target.value,10);
    CurrentCrystals = parseInt(e.target.value,10);

    updateCalculations()
}

function setSOSbracket(e){
    // Set difficulty
    switch(e.target.value){
        case '5+':
            bracket = SOSbracketType.five;
            break;
        case '4':
            bracket = SOSbracketType.four;
            break;
        case '3':
            bracket = SOSbracketType.three;
            break;
        case '2':
            bracket = SOSbracketType.two;
            break;
        case '1':
            bracket = SOSbracketType.one;
            break;
    }
    determineSOSrewards();
    determineSOSbracketrewards();
}

function determineSOSrewards(){
    let Rewards = 0;
    switch(bracket){
        case SOSbracketType.five:
            Rewards = 500;
            break;
        case SOSbracketType.four:
            Rewards = 475;
            break;
        case SOSbracketType.three:
            Rewards = 450;
            break;
        case SOSbracketType.two:
            Rewards = 425;
            break;
        case SOSbracketType.one:
            Rewards = 400;
            break;
    }
    SOSReward = Rewards*patchleft;
    document.getElementById('SOS-rewards').innerText = SOSReward;
}

function determineSOSbracketrewards(){
    let Rewards = 0;
    switch(bracket){
        case SOSbracketType.five:
            Rewards = 250;
            break;
        case SOSbracketType.four:
            Rewards = 225;
            break;
        case SOSbracketType.three:
            Rewards = 200;
            break;
        case SOSbracketType.two:
            Rewards = 175;
            break;
        case SOSbracketType.one:
            Rewards = 150;
            break;
    }
    SOSBracketReward = Rewards*patchleft;
    document.getElementById('SOS-bracket-rewards').innerText = SOSBracketReward;
}

function determineDailyMissionReward(e){
    MissionReward = 80 * e;
    document.getElementById('mission-rewards').innerText = MissionReward;
}

function determineDailyCommissionReward(e){
    ComissionReward = 10 * e;
    document.getElementById('commission-rewards').innerText = ComissionReward;
}

function determineActivitiesReward(e){
    activitiesReward = Activities ? 10 * e : 0;
    document.getElementById('activities-rewards').innerText = activitiesReward;
}
    
function determineRaidReward(){
    GuildRaidReward = 320 * RaidLeft;
    document.getElementById('raid-rewards').innerText = GuildRaidReward;
}

function determineTrialReward(){
    CharacterTrialReward = 60 * patchleft;
    document.getElementById('Trial-rewards').innerText = CharacterTrialReward;
}

function determineMailReward(){
    MailReward = 300 * patchleft;
    document.getElementById('Version-mail-rewards').innerText = MailReward;
}

function determineVersionLoginReward(e){
    let bonuscard = 0;
    VersionLoginReward = 0;
    let EffectiveDaysLeft = e-(14-patch_to_today);
    if (patch_to_today < 7 && e > (7-patch_to_today)){
        bonuscard = 10-DailyLoginCard[patch_to_today];
    }
    if (patch_to_today < 7 && !(e > (7-patch_to_today))){
        bonuscard = DailyLoginCard[e]-DailyLoginCard[patch_to_today];
    }
    if (EffectiveDaysLeft%14>0 && EffectiveDaysLeft%14 <= 7 && EffectiveDaysLeft ){
        bonuscard = bonuscard + DailyLoginCard[EffectiveDaysLeft%14-1];
    }
    if ((EffectiveDaysLeft%14)>7 || (EffectiveDaysLeft%14 == 0 && EffectiveDaysLeft>=14)){
        bonuscard = bonuscard + DailyLoginCard[6]
    }
    VersionLoginReward = patchleft>0 ? 10*150 * (patchleft-1) + bonuscard*150 : bonuscard*150 ;
    document.getElementById('Version-login-rewards').innerText = VersionLoginReward;
}

function determineMonthlyPassReward(e){
    MonthlyPassReward = monthlypass ? 100 * e : 0;
    document.getElementById('pass-rewards').innerText = MonthlyPassReward;
}

function determineVersionCodeReward(){
    VersionCodeReward = patchleft * 300;
    document.getElementById('Version-code-rewards').innerText = VersionCodeReward;
}

function determineMonthlyShopReward(e){
    let startDate = new Date();
    let endDate = new Date(enddate);
    let count = 0;
    let currentDate = new Date(startDate);
    if (currentDate.getDate() !== 1) {
        currentDate.setMonth(currentDate.getMonth() + 1);
        currentDate.setDate(1);
    }
    while (currentDate <= endDate) {
        if (currentDate.getDate() === 1) {
            count++;
        }
        currentDate.setMonth(currentDate.getMonth() + 1);
        currentDate.setDate(1);
    }
    MonthlyShopReward = 150 * 5 * count;
    document.getElementById('Monthly-shop-rewards').innerText = MonthlyShopReward;
}

function determineTotalCrystalRewards(){
    totalcrystals = CurrentCrystals + MissionReward + ComissionReward + activitiesReward + MonthlyPassReward + SOSBracketReward + SOSReward + GuildRaidReward + CharacterTrialReward + VersionLoginReward + MonthlyShopReward + MailReward;
    document.getElementById('total-rewards').innerText = totalcrystals + ' crystals';
    document.getElementById('total-pulls').innerText = Math.floor(totalcrystals/150) + ' Character pulls';
}