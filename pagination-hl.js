!(function ($) {
    $.fn.extend({
        pagination: function(option) {
            var _this = this,
                defOpt = {
                    totalRowCnt: 0,
                    currentPage: 0,
                    pageSize: 10
                };

            $.extend(defOpt, option);
            var totalRowCnt = Number(defOpt.totalRowCnt), // 总行数.
                currentPage = Number(defOpt.currentPage), // 当前页数.
                totalPage = Math.ceil(totalRowCnt / defOpt.pageSize); //总页数.

            if (totalRowCnt == 0) {
                return ;
            }

            /* html页码填充 */
            var htmlStr = '<ul class="pagination">';
            htmlStr += _this.paginationProc({currentPage: currentPage, totalPage: totalPage});
            htmlStr += '</ul>';
            $(this).html(htmlStr);

            /* 页码事件 */
            $('.pagination').off("click").on("click", function(e) {
                e.preventDefault();
                var ele = $(e.target);
                    page = parseInt(ele.text());
                
                if (!isNaN(page)) {
                    _this.pagination({
                        totalRowCnt: totalRowCnt,
                        currentPage: page
                    });
                }
            });
        },
        paginationProc: function(obj) {
            var htmlStr = '';
            if (obj.totalPage <= 6){
                for(var i = 1; i <= obj.totalPage; ++i) {
                    htmlStr += '<li' + (i == obj.currentPage ? ' class="active"' : '') + '><a href="javascript:void(0);">' + i + '</a></li>';
                }
            } else {
                htmlStr += '<li' + (1 == obj.currentPage ? ' class="active"' : '') + '><a href="javascript:void(0);">1</a></li>'; // 第一页.
                if (obj.totalPage > 6 && obj.currentPage < 5) { // 右侧...
                    for(var j = 2; j < 7; ++j) {
                        htmlStr += '<li' + (j == obj.currentPage ? ' class="active"' : '') + '><a href="javascript:void(0);">' + j + '</a></li>';
                    }
                    htmlStr += '<li class="disabled"><a href="javascript:void(0);">...</a></li>';
                } else if (obj.currentPage > 4 && (obj.totalPage - obj.currentPage) < 3) { // 左侧...
                    htmlStr += '<li class="disabled"><a href="javascript:void(0);">...</a></li>';
                    for(var j = obj.totalPage - 5; j < obj.totalPage; ++j) {
                        htmlStr += '<li' + (j == obj.currentPage ? ' class="active"' : '') + '><a href="javascript:void(0);">' + j + '</a></li>';
                    }
                } else { // 中间
                    htmlStr += '<li class="disabled"><a href="javascript:void(0);">...</a></li>';
                    for(var j = (obj.currentPage - 2); j <= (obj.currentPage + 2); ++j) {
                        htmlStr += '<li' + (j == obj.currentPage ? ' class="active"' : '') + '><a href="javascript:void(0);">' + j + '</a></li>';
                    }
                    htmlStr += '<li class="disabled"><a href="javascript:void(0);">...</a></li>';
                }
                htmlStr += '<li' + (obj.totalPage == obj.currentPage ? ' class="active"' : '') + '><a href="javascript:void(0);">' + obj.totalPage + '</a></li>'; // 最后一页.
            }

            return htmlStr;
        }
    });

    $.fn.createTable = function(dataList, pageSize) {
        var htmlStr = '';
        htmlStr += '<table class="table table-hover piece" style="margin-left: 0;">';
        htmlStr += '<thead><tr><th>cid</th><th>uid</th><th>email</th><th>telephone</th><th>company_name</th><th>name</th></tr></thead><tbody>';
        for (var i = 0; i < pageSize; i++) {
            htmlStr += '<tr><td>' + dataList[i].cid + '</td>';
            htmlStr += '<td>' + dataList[i].uid + '</td>';
            htmlStr += '<td>' + dataList[i].email + '</td>';
            htmlStr += '<td>' + dataList[i].telephone + '</td>';
            htmlStr += '<td>' + dataList[i].company_name + '</td>';
            htmlStr += '<td>' + dataList[i].name + '</td>';
            htmlStr += '</tr>';
        }
        htmlStr += '</tbody></table>';
        $(this).empty().html(htmlStr);
    }
})(jQuery);