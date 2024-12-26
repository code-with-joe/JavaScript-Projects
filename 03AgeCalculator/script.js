const dob = document.getElementById('dob');
dob.max = new Date().toISOString().split("T")[0];
const submit = document.querySelector('.submit');
const dd = document.querySelector('.dd');
const mm = document.querySelector('.mm');
const yy = document.querySelector('.yy');
const result = document.querySelector('.output-div')
const errorMsg = document.querySelector('h4')
const reset = document.querySelector('.reset')

submit.addEventListener('click', () => {
    if(dob.value){
    
        let dateOfBirth = new Date(dob.value);
        let today = new Date();
    
        let birthDay = dateOfBirth.getDate();
        let birthMonth = dateOfBirth.getMonth();
        let birthYear = dateOfBirth.getFullYear();
    
        let currentDay = today.getDate();
        let currentMonth = today.getMonth();
        let currentYear = today.getFullYear();
    
       
        let ageYears = currentYear - birthYear;
    
       
        let ageMonths = currentMonth - birthMonth;
        if (ageMonths < 0) {
            ageYears--;
            ageMonths += 12;
        }
    
    
        let ageDays = currentDay - birthDay;
        if (ageDays < 0) {
            if (ageMonths > 0) {
                ageMonths--;
            } else {
                ageYears--;
                ageMonths = 11;
            }
            let prevMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
            let daysInPrevMonth = new Date(currentYear, prevMonth + 1, 0).getDate();
            ageDays += daysInPrevMonth;
        }
    
       
        dd.innerHTML = ageDays;
        mm.innerHTML = ageMonths;
        yy.innerHTML = ageYears;
        errorMsg.style.display = "none"
        result.style.display = "flex"
        reset.style.display = "block"
    
    
}else{
        errorMsg.style.display = "block"
         result.style.display = "none"
         reset.style.display = "none"
    }
})

reset.addEventListener('click', () => {
       result.style.display = "none"
       reset.style.display = "none"
        dob.value = "";
        dd.innerHTML = "00";
        mm.innerHTML = "00";
        yy.innerHTML = "00";
})