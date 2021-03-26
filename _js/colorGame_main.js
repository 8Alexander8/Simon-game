//לאחר לחיצה על כפותר ההתחל יתבצע עירבוב במערך הסדר של האיידי של הכפתורים 
//כל כפתור של צבע יוגדל ב120 אחוז כל שנייה לפי הסדר במערך המעורבב
//על השחקן להקיש על הכפתורים לפי הסדר של אותו המערך
//במידה והוקש בסדר הנכון השחקן זכה 
//במידה והוקש בסדר הלא נכון השחקן הפסיד ועליו ללחוץ על כפתור ההתחל בכדי להתחיל משחק חדש

$(document).ready(function () {
    var i = 0;
    var interval;
    $(".container").append(`<button class="colorBtn" id="id_btn_blue"></button>`);
    $(".container").append(`<button class="colorBtn" id="id_btn_green"></button>`);
    $(".container").append(`<button class="colorBtn" id="id_btn_yellow"></button>`);
    $(".container").append(`<button class="colorBtn" id="id_btn_red"></button>`);
    $(".footer").append(`<button id="id_btn_start">START GAME</button>`);

    $("#id_btn_start").click(function () {
        //איפוס כללי להתחלת משחק חדש
        $("#id_display_win").html("");
        $("#id_display_win").removeClass("display_worng display_win")
        //ביטול כל האירועים המקושרים לאלמנט(במקרה הזה אירוע ההמתנה ללחיצה)
        $(".colorBtn").unbind();
        btnCheck_arr = [];
        i = 0;

        //עירבוב סדר האיידי במערך
        Util.shuffle(btnId_arr);
        console.log(btnId_arr);

        //קריאה לפונקציה כל שנייה אשר מגדילה ומקטינה את גודל הכפתור
        interval = setInterval(setTransform, 1000);
        for (let x in btnId_arr) {
            $(`#${btnId_arr[x]}`).click(function () {
                btnCheck_arr.push(btnId_arr[x]);
                console.log(btnCheck_arr);
                if (btnCheck_arr.length == btnId_arr.length) {
                    for (let y in btnCheck_arr) {
                        if (btnCheck_arr[y] == btnId_arr[y]) {
                            btnCheck_arr.push("x");
                        } else {
                            $("#id_display_win").html("WRONG , TRY AGAIN");
                            $("#id_display_win").addClass("display_worng");


                            break;
                        }
                    }
                    if (btnCheck_arr.length == 8) {
                        $("#id_display_win").html("CORRECT");
                        $("#id_display_win").addClass("display_win");
                    }
                }
            })
        }
    })

    //מערך איידי של הכפתורים לשם עירבוב הסדר שלהם אשר בו תשתמש הפונקציה להגדלה ולהשוואה עם הסדר לחיצה של השחקן
    var btnId_arr = ["id_btn_blue", "id_btn_green", "id_btn_yellow", "id_btn_red"];
    //מערך ריק שלתוכו יתבסף האיידי של הכפתור שעליו לחץ השחקן ולאחר מכן סדר הלחיצה יושווה לסדר של המערך הראשי המעורבב
    var btnCheck_arr = [];

    //פונקציה להוספת הסטייל שמגדיל את הכפתור ולאחר חצי שנייה קורא לפונקציה שמחזירה את הסטייל בחזרה למצב הרגיל
    function setTransform() {
        if (i < btnId_arr.length) {
            $(`#${btnId_arr[i]}`).toggleClass("btn_transform");
            setTimeout(removeTransform, 500);
        } else {
            clearInterval(interval);
        }
    }

    //פונקציה להחלפת הסטייל בחזה לגודל הרגיל
    function removeTransform() {
        $(`#${btnId_arr[i]}`).toggleClass("btn_transform");
        i++;
    }
});