$(function () {
    //榧犳爣缁忚繃灞曞紑瀵艰埅搴曢儴
    $(".header-menu .menu li").mouseenter(function () {
        if ($(this).find(".child").length) {
            $(".header-menu").addClass("open");
        } else {
            $(".header-menu").removeClass("open");
        }
    })
    $(".header-menu .menu li").mouseleave(function () {
        $(".header-menu").removeClass("open");
    })
    //

    //鎵嬫満瀵艰埅
    $("#menu_h,#ph_menu_bg").click(function () {
        $(".menu li").removeClass("open");
        $("body").toggleClass("menu-open");
    })

    //鎵嬫満瀵艰埅灞曞紑
    if ($(".menu_h").is(":visible")) {
        $(".menu li .a1").click(function (e) {
            var a1 = $(this).parent("li").find(".child").length,
                a2 = $(this).parent("li").hasClass("open");
            if (a1) {
                if (!a2) {
                    e.preventDefault();
                }
                $(this).parents("li").toggleClass("open").siblings().removeClass("open");
            }

        })
    }


    //瀵艰埅閬僵
    $("#ph_menu_bg").on("touchmove", function (e) {
        e.preventDefault();
    });

    //瀵艰埅婊氬姩鏁堟灉
    var tp1 = $(".header-menu").offset().top
    $(window).scroll(function () {
        var tp2 = $(this).scrollTop()
        if (tp2 > tp1) {
            $("body").addClass('scrollmenu')
        } else {
            $("body").removeClass('scrollmenu')
        }
    })
    //

    //瀵艰埅瀹氫綅
    var hrefs = window.location.href;
    if (hrefs.indexOf('/about/') != -1) $(".menu .li2").addClass("cur").siblings().removeClass("cur");
    if (hrefs.indexOf('/science/') != -1) $(".menu .li3").addClass("cur").siblings().removeClass("cur");
    if (hrefs.indexOf('/service/') != -1) $(".menu .li4").addClass("cur").siblings().removeClass("cur");
    if (hrefs.indexOf('/human/') != -1) $(".menu .li5").addClass("cur").siblings().removeClass("cur");
    if (hrefs.indexOf('/partygroup/') != -1) $(".menu .li6").addClass("cur").siblings().removeClass("cur");
    if (hrefs.indexOf('/publicity/') != -1) $(".menu .li7").addClass("cur").siblings().removeClass("cur");
    if (hrefs.indexOf('/news/') != -1) $(".menu .li8").addClass("cur").siblings().removeClass("cur");
    if (hrefs.indexOf('/other/') != -1) $(".menu li").removeClass("cur");
    //



    //tab閫夐」鍗″垏鎹�
    $(".tab-box").each(function (i, v) {
        var that = $(this)
        that.find(".tab-a").mouseenter(function (e) {
            var i = $(this).index();
            $(this).addClass("cur").siblings().removeClass("cur");
            that.find('.tab-b').eq(i).show().siblings().hide();
            that.find('.tab-c').eq(i).show().siblings().hide();
        });
        that.find(".tab-a").eq(0).mouseenter();
    })
    setTimeout(function () {
        $(".tab-box").each(function (i, v) {
            var that = $(this)
            that.find(".tab-a").mouseenter(function (e) {
                var i = $(this).index();
                $(this).addClass("cur").siblings().removeClass("cur");
                that.find('.tab-b').eq(i).show().siblings().hide();
                that.find('.tab-c').eq(i).show().siblings().hide();
            });
            that.find(".tab-a").eq(0).mouseenter();
        })
    }, 300);

    //
    $("img").each(function (e) {
        if ($(this).attr("src") == '') {
            $(this).attr("src", nullimg).addClass("nodata")
        }
        //$(this).onerror=lod();
    })

})

//杞藉叆閿欒鍥剧墖
var nullimg = '/static/images/404.png'; //閿欒鍥捐矾寰勶紱

function lod(t) {
    t.onerror = null;
    t.src = nullimg
}
//end


//鍝嶅簲寮忓瓧鍙风缉鏀�
function getsize() {

    var w = $(window).width();
    if (w < 414) {
        var s = (w / 414 * 0.625) * 100 + "%"
        $("html").css("font-size", s);
    }
}
$(function () {
    //鎵嬫満鐗堝瓧鍙风缉鏀�
    $(window).resize(function (e) {
        getsize();
    })
    getsize();
})
//end