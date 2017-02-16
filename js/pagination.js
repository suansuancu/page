/**
 * Created by dell on 2017/2/15.
 */
(function ($) {
	$.fn.pagination = function (option) {
		var defaultOpt = {
			totalCount: 0,
			currentPage: 0,
			showItemsNum: 10,
			callback: function () {
				showCurrent(totalCount, currentPage, totalPage);
			}
		};

		$.extend(defaultOpt, option);
		var totalCount = Number(defaultOpt.totalCount),
			currentPage = Number(defaultOpt.currentPage),
			totalPage = Math.ceil(totalCount / defaultOpt.showItemsNum);
		var that = this;

		showCurrent(totalCount, currentPage, totalPage);

		function showCurrent(totalCount, currentPage, totalPage) {
			if (totalCount == 0) {
				return;
			}

			if (totalPage > 0) {
				var htmls = "";
				htmls = htmls + "<ul class='pagination'>";

				//前半部分
				if (currentPage == 1) {
					htmls = htmls + '<li class="active"><a href="javascript:void(0);">1</a></li>';
				} else {
					htmls = htmls + '<li><a href="javascript:void(0);">1</a></li>';
					if (currentPage > 4) {
						htmls = htmls + '<li class="disabled"><a href="javascript:void(0);">...</a></li>';
						if ((totalPage - currentPage) == 1) {
							for (var i = currentPage - 3; i < currentPage; i++) {
								htmls = htmls + '<li><a href="javascript:void(0);">' + i + '</a></li>'
							}
						} else if (totalPage == currentPage) {
							for (var i = currentPage - 4; i < currentPage; i++) {
								htmls = htmls + '<li><a href="javascript:void(0);">' + i + '</a></li>'
							}
						} else {
							for (var i = currentPage - 2; i < currentPage; i++) {
								htmls = htmls + '<li><a href="javascript:void(0);">' + i + '</a></li>'
							}
						}
					} else {
						for (var i = 2; i < currentPage; i++) {
							htmls = htmls + '<li><a href="javascript:void(0);">' + i + '</a></li>'
						}
					}
					htmls = htmls + '<li class="active"><a href="javascript:void(0);">' + currentPage + '</a></li>'
				}

				//后半部分
				if ((currentPage + 3) >= totalPage) {
					for (var j = currentPage + 1; j <= totalPage; j++) {
						htmls = htmls + '<li><a href="javascript:void(0);">' + j + '</a></li>';
					}
				} else {
					if (currentPage == 2) {
						for (var j = currentPage + 1; j <= currentPage + 3; j++) {
							htmls = htmls + '<li><a href="javascript:void(0);">' + j + '</a></li>';
						}
					} else if (currentPage == 1) {
						for (var j = currentPage + 1; j <= currentPage + 4; j++) {
							htmls = htmls + '<li><a href="javascript:void(0);">' + j + '</a></li>';
						}
					} else {
						htmls = htmls + '<li><a href="javascript:void(0);">' + (currentPage + 1) + '</a></li><li><a href="javascript:void(0);">' + (currentPage + 2) + '</a></li>';
					}
					htmls = htmls + '<li class="disabled"><a href="javascript:void(0);">...</a></li><li><a href="javascript:void(0);">' + totalPage + '</a></li>';
				}

				$(that).html(htmls);
			}
		}


		$('.pagination li').on('click', function (event) {
			event.preventDefault();

			var curNum = Number($(this).text());
			var activePage = $('.pagination li.active').text();

			$('.pagination li').removeClass('active');
			$(this).addClass('active');

			defaultOpt.callback(totalCount, curNum, totalPage);

			var url = '',
				params = {
					current: currentPage
				};

			$.post(url, params, function (rep) {
				/* $('#creatPage').pagination({
				 totalCount: rep.data.totalCount,
				 currentPage: rep.data.currentPage,
				 showItemsNum: 10
				 });
				 $('#creatTable').createTable(rep.data.list, 10);*/
			});


		});

	};
	$.fn.createTable = function (dataList, showItemsNum) {
		var html = [];
		html.push(' <table class="table table-hover piece" style="margin-left: 0;">');
		html.push(' <thead><tr><th>cid</th><th>uid</th><th>email</th><th>telephone</th><th>company_name</th><th>name</th></tr></thead><tbody>');
		for (var i = 0; i < showItemsNum; i++) {
			html.push('<tr><td>' + dataList[i].cid + '</td>');
			html.push('<td>' + dataList[i].uid + '</td>');
			html.push('<td>' + dataList[i].email + '</td>');
			html.push('<td>' + dataList[i].telephone + '</td>');
			html.push('<td>' + dataList[i].company_name + '</td>');
			html.push('<td>' + dataList[i].name + '</td>');
			html.push('</tr>');
		}
		html.push('</tbody></table>');
		var mainTable = $(this);
		mainTable.empty();
		mainTable.html(html.join(''));
	}
})(jQuery);
