var dob = document.querySelector('#dob');
var btnCheck = document.querySelector('#btn-check');
var output = document.querySelector('#output');

// var date = { day: 2 , month: 4 ,year: 2001};

function palindromeConv(str) {
    var dateSplit = str.split('');
    var revStr = dateSplit.reverse();
    var joinStrRev = revStr.join('');

    return joinStrRev;
}

function checkPalind(str) {
    var reverse = palindromeConv(str);
    return str===reverse;
}
// console.log(checkPalind("mom"));
// console.log(checkPalind("yaya"));

function convDate2Str(date) {
    var date2str = { day: '' , month: '' ,year: ''};
    if(date.day < 10){
        date2str.day = '0'+ date.day;
    } else {
        date2str.day = date.day.toString(); 
        // toString() method can be used to convert a string object into a string.
    }
    if (date.month < 10) {
        date2str.month = '0' + date.month;
    } else {
        date2str.month = date.month.toString();
    }
    date2str.year = date.year.toString();

    return date2str;
}
// var date = { day: 2 , month: 4 , year: 2001};
// console.log(convDate2Str(date));

function allDateFormats(date) {
    var date2str = convDate2Str(date);

    var ddmmyyyy = date2str.day + date2str.month + date2str.year;
    var mmddyyyy = date2str.month + date2str.day + date2str.year;
    var yyyymmdd = date2str.year + date2str.month + date2str.day;
    var ddmmyy = date2str.day + date2str.month + date2str.year.slice(-2);
    var mmddyy = date2str.month + date2str.day + date2str.year.slice(-2);
    var yymmdd = date2str.year.slice(-2) + date2str.month + date2str.day;

    return [ ddmmyyyy, mmddyyyy, yyyymmdd , ddmmyy , mmddyy , yymmdd ];
}
// var date = { day: 2 , month: 4 , year: 2001};
// console.log(allDateFormats(date));

function checkPalindForAllDateFormats(date) {
    var checkingPADF = allDateFormats(date);
    var testing = false;

    for (let i = 0; i < checkingPADF.length; i++) {
        if (checkPalind(checkingPADF[i])) {
          testing = true;
          
          break;
        }
        
    }
    return testing;
}
// var date = { day: 2 , month: 4 , year: 2001};
// console.log(checkPalindForAllDateFormats(date));

function leapYr(year) {
    if(year%400=== 0){
        return true;
    }
    if(year%100===0){
        return false;
    }
    if(year%4===0){
        return true;
    }
    return false;
}

function futureDate(date){
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInAMonth= [31,28,31,30,31,30,31,31,30,31,30,31];

    // for leap yr
    if(month===2){
        if(leapYr(year)){
           if(day>29){
            day=1;
            month++;
           } 
        }else{
            if(day>28){
                day = 1;
                month++;
            }
        }
    }else{
        if(day>daysInAMonth[month-1]){
            day=1;
            month++;
        }
    } if (month>12) {
        month= 1;
        year++;
    }
    return{
        day: day,
        month: month,
        year: year,
    }
}
// var date = { day: 2 , month: 4 , year: 2001};
// console.log(futureDate(date));

function futurePalindromeDate(date) {
    var counter = 0;
    var nextDate = futureDate(date);

    while(1) {
        counter++;
        var checkPalind = checkPalindForAllDateFormats(nextDate);
        if(checkPalind){
            break;
        }
        nextDate = futureDate(nextDate);
    } 
    return [counter, nextDate];
}
// var date = { day: 2 , month: 4 , year: 2001};
// console.log(futurePalindromeDate(date));

function clickHandler() {
    var dobStr = dob.value;

    if(dobStr !== ''){
        var dobList=dobStr.split('-');

        var date = {
        day: Number(dobList[2]),
        month: Number(dobList[1]),
        year: Number(dobList[0]),
        };
        var checkPalind = checkPalindForAllDateFormats(date);

        if (checkPalind) {
            output.innerText = 'Your birthday is a Palindrome';
        } else {
            var[counter,nextDate] = futurePalindromeDate(date);
            output.innerText = 'The next palindrome birthday occurs on '+ nextDate.day+'-'+nextDate.month+'-'+nextDate.year + ' and you missed it by '+ counter + ' days.';
        }
    } 
}

btnCheck.addEventListener('click', clickHandler);
