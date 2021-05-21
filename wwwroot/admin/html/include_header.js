$(function(){


    var header = `
        <header class="header">
			<div class="header-top">
				header
			</div>
			<div class="gnb-wrap">
				<ul class="gnb-area">
					<li>
						<strong class="lnb-toggle-bt" data-target="lnb-area-01" data-on="true" data-siblings="true">판매상품 관리</strong>
						<ul class="lnb-area lnb-area-01">
							<li><a href="">일반상품 목록</a></li>
							<li><a href="">사은품 목록</a></li>
							<li><a href="">재입고 알림</a></li>
							<li><a href="">카테고리 관리</a></li>
							<li><a href="">브랜드 관리</a></li>
							<li><a href="">상품 전시 관리</a></li>
						</ul>
					</li>
					<li>
						<strong class="lnb-toggle-bt" data-target="lnb-area-02" data-on="true" data-siblings="true">주문 관리</strong>
						<ul class="lnb-area lnb-area-02">
							<li><a href="">통합 주문 목록 <span>11</span></a></li>
							<li><a href="">입금대기 목록 <span>11</span></a></li>
							<li><a href="">결제완료 목록 <span>11</span></a></li>
							<li><a href="">상품준비중 목록 <span>11</span></a></li>
							<li><a href="">송장일괄등록</a></li>
							<li><a href="">배송중 목록 <span>11</span></a></li>
							<li><a href="">배송완료 목록 <span>11</span></a></li>
							<li><a href="">구매확정 목록 <span>11</span></a></li>
							<li><a href="">결제 중단/실패 목록 <span>11</span></a></li>
							<li><a href="">현금영수증 발급/조회</a></li>
							<li><a href="">수동 주문 등록</a></li>
						</ul>
					</li>
					<li>
						<strong class="lnb-toggle-bt" data-target="lnb-area-03" data-on="true" data-siblings="true">취소/반품/교환 관리</strong>
						<ul class="lnb-area lnb-area-03">
							<li><a href="">취소 목록 <span>11</span></a></li>
							<li><a href="">교환 목록 <span>11</span></a></li>
							<li><a href="">반품 목록 <span>11</span></a></li>
							<li><a href="">환불 목록 <span>11</span></a></li>
						</ul>
					</li>
					<li>
						<strong class="lnb-toggle-bt" data-target="lnb-area-04" data-on="true" data-siblings="true">회원 관리</strong>
						<ul class="lnb-area lnb-area-04">
							<li><a href="">회원 목록</a></li>
							<li><a href="">휴면 회원 목록</a></li>
							<li><a href="">탈퇴 회원 목록</a></li>
							<li><a href="">카카오 알림톡</a></li>
							<li><a href="">SMS 발송 관리</a></li>
							<li><a href="">SMS 대량발송</a></li>
							<li><a href="">이메일 발송 관리</a></li>
							<li><a href="">이메일 대량 발송</a></li>
							<li><a href="">리마인드 메시지 관리</a></li>
						</ul>
					</li>
					<li>
						<strong class="lnb-toggle-bt" data-target="lnb-area-05" data-on="true" data-siblings="true">게시판 관리</strong>
						<ul class="lnb-area lnb-area-05">
							<li><a href="">게시판 목록</a></li>
							<li><a href="">게시글 관리</a></li>
							<li><a href="">금칙어 관리</a></li>
							<li><a href="">FAQ 관리</a></li>
						</ul>
					</li>
					<li>
						<a href="">프로모션 관리</a>
					</li>
					<li>
						<a href="">마케팅 관리</a>
					</li>
					<li>
						<a href="">통계</a>
					</li>
					
				</ul>
				<button type="button" class="gnb-toggle-bt" data-target="gnb-wrap" data-on="true" data-sort="none"></button>
			</div>
		</header>
    `;

    
	console.log(111);
    $('.header').html(header);
    $('.header .header').unwrap();


});