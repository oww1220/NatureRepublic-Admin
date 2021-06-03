$(function(){


    var header = `
	<div class="sidebar-menu">
	<div class="sidebar-menu-inner">
		<header class="logo-env">
			<!-- logo collapse icon -->
			<div class="sidebar-collapse">
				<a href="#" class="sidebar-collapse-icon">
					<i class="ico drawer">drawer</i>
				</a>
			</div>
			<!-- logo -->
			<div class="logo">
				<a href=""> 
					NATURE REPUBLIC
				</a>
			</div>
			<!-- open/close menu icon (do not remove if you want to enable menu on mobile devices) -->
			<div class="sidebar-mobile-menu visible-xs">
				<a href="#" class="with-animation">
				<!-- add class "with-animation" to support animation --><i class="entypo-menu"></i> </a>
			</div>
			
		</header>
		<ul id="main-menu" class="main-menu">
			<li>
				<a href="" title="판매상품 관리" data-menunum="1"><i class="ico head01"></i><span>판매상품 관리</span></a>
				<ul class="has-sub">
					<li><a href="" title="" data-menunum="1"><span>일반상품 목록</span></a></li>
					<li><a href="" title="" data-menunum="2"><span>사은품 목록</span></a></li>
					<li><a href="" title="" data-menunum="3"><span>재입고 알림</span></a></li>
					<li><a href="" title="" data-menunum="4"><span>카테고리 관리</span></a></li>
					<li><a href="" title="" data-menunum="5"><span>브랜드 관리</span></a></li>
					<li><a href="" title="" data-menunum="6"><span>상품 전시 관리</span></a></li>
				</ul>
			</li>
			<li>
				<a href="" title="주문 관리" data-menunum="2"><i class="ico head02"></i><span>주문 관리</span></a>
				<ul class="has-sub">
					<li><a href="" title="" data-menunum="1"><span>통합 주문 목록 <em>11</em></span></a></li>
					<li><a href="" title="" data-menunum="2"><span>입금대기 목록 <em>11</em></span></a></li>
					<li><a href="" title="" data-menunum="3"><span>결제완료 목록 <em>11</em></span></a></li>
					<li><a href="" title="" data-menunum="4"><span>상품준비중 목록 <em>11</em></span></a></li>
					<li><a href="" title="" data-menunum="5"><span>송장일괄등록 <em>11</em></span></a></li>
					<li><a href="" title="" data-menunum="6"><span>배송중 목록 <em>11</em></span></a></li>
					<li><a href="" title="" data-menunum="7"><span>배송완료 목록 <em>11</em></span></a></li>
					<li><a href="" title="" data-menunum="8"><span>구매확정 목록 <em>11</em></span></a></li>
					<li><a href="" title="" data-menunum="9"><span>결제 중단/실패 목록 <em>11</em></span></a></li>
					<li><a href="" title="" data-menunum="10"><span>현금영수증 발급/조회 <em>11</em></span></a></li>
					<li><a href="" title="" data-menunum="11"><span>수동 주문 등록 <em>11</em></span></a></li>
				</ul>
			</li>
			<li>
				<a href="" title="취소/반품/교환 관리" data-menunum="3"><i class="ico head03"></i><span>취소/반품/교환 관리</span></a>
				<ul class="has-sub">
					<li><a href="" title="" data-menunum="1"><span>취소 목록 <em>11</em></span></a></li>
					<li><a href="" title="" data-menunum="2"><span>교환 목록 <em>11</em></span></a></li>
					<li><a href="" title="" data-menunum="3"><span>반품 목록 <em>11</em></span></a></li>
					<li><a href="" title="" data-menunum="4"><span>환불 목록 <em>11</em></span></a></li>
				</ul>
			</li>
			<li>
				<a href="" title="회원 관리" data-menunum="4"><i class="ico head04"></i><span>회원 관리</span></a>
				<ul class="has-sub">
					<li><a href="" title="" data-menunum="1"><span>회원 목록</span></a></li>
					<li><a href="" title="" data-menunum="2"><span>휴면 회원 목록</span></a></li>
					<li><a href="" title="" data-menunum="3"><span>탈퇴 회원 목록</span></a></li>
					<li><a href="" title="" data-menunum="4"><span>카카오 알림톡</span></a></li>
					<li><a href="" title="" data-menunum="5"><span>SMS 발송 관리</span></a></li>
					<li><a href="" title="" data-menunum="6"><span>SMS 대량발송</span></a></li>
					<li><a href="" title="" data-menunum="7"><span>이메일 발송 관리</span></a></li>
					<li><a href="" title="" data-menunum="8"><span>이메일 대량 발송</span></a></li>
					<li><a href="" title="" data-menunum="9"><span>리마인드 메시지 관리</span></a></li>
				</ul>
			</li>
			<li>
				<a href="" title="게시판 관리" data-menunum="5"><i class="ico head05"></i><span>게시판 관리</span></a>
				<ul class="has-sub">
					<li><a href="" title="" data-menunum="1"><span>게시판 목록</span></a></li>
					<li><a href="" title="" data-menunum="2"><span>게시글 관리</span></a></li>
					<li><a href="" title="" data-menunum="3"><span>금칙어 관리</span></a></li>
					<li><a href="" title="" data-menunum="4"><span>FAQ 관리</span></a></li>
				</ul>
			</li>
			<li>
				<a href="" title="" data-menunum="6"><i class="ico head06"></i><span>프로모션 관리</span></a>
			</li>
			<li>
				<a href="" title="" data-menunum="7"><i class="ico head07"></i><span>마케팅 관리</span></a>
			</li>
			<li>
				<a href="" title="" data-menunum="8"><i class="ico head08"></i><span>통계</span></a>
			</li>

			
		</ul>
	</div>
</div>
    `;

	var headerTop = `
	<div class="header-top">
			<div class="left-side">
				<ul>
					<li>
						<a href=""><i class="ico config mr-5"></i>환경설정</a>
					</li>
					<li>
						<a href=""><i class="ico design mr-5"></i>디자인관리</a>
					</li>
					<li>
						<a href=""><i class="ico crm mr-5"></i>CRM</a>
					</li>
				</ul>
			</div>
			<div class="right-side">
				<div class="input_S">
					<input type="text" placeholder="검색어를 입력해주세요." />
					<button type="button">검색</button>
				</div>
				<ul class="user-info pull-left pull-none-xsm">
					<!-- Profile Info -->
					<li class="profile-info dropdown">
						<!-- add class "pull-right" if you want to place this from right -->
						<a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"> 
							<!--
							<img src="/images/adm/icn_user_001.png" alt="" class="img-circle" width="40"> -->
							관리자                
						</a>
						<ul class="dropdown-menu">
							<!-- Reverse Caret -->
							<!--<li class="caret"></li>-->
							<!-- Profile sub-links -->
							<li>
								<a href="/adm/mng/sms/index"> <i class="entypo-window"></i> 문자 발송 </a>
							</li>
							<li>
								<a href="/adm/deviceuser/mobile/"> <i class="entypo-calendar"></i>접속기기관리</a>
							</li>
							<li>
								<a href="/member/logout"> <i class="entypo-logout right"></i>Log Out</a>
							</li>
							<!--
							<li>
								<a href="/adm/sms/"> <i class="entypo-doc"></i> 쪽지 보내기 </a>
							</li>
							<li>
								<a href="/adm/sms/"> <i class="entypo-print"></i> 영수증 인쇄 </a>
							</li>
							<li>
								<a href="http://demo.neontheme.com/mailbox/main/"> <i class="entypo-mail"></i> Inbox
								</a>
							</li>
							<li>
								<a href="http://demo.neontheme.com/extra/calendar/"> <i class="entypo-calendar"></i> Calendar
								</a>
							</li>
							<li>
								<a href="#"> <i class="entypo-clipboard"></i> Tasks
								</a>
							</li>
							-->
						</ul>
					</li>
					
					<li>
						<a href="">
							<i class="ico alarm"><em>11</em></i>
						</a>
					</li>
					<li> 
						<a href="">
							<i class="ico logout"></i>
						</a> 
					</li>
					
				</ul>
			</div>
		</div>
	`; 

	var pathW = `
		<div class="path-W">
			<ul>
				<li>
					<a href="">Home</a>
				</li>
				<li>기본설정</li>
				<li>사용자관리</li>
			</ul>
		</div>
	`;

	var footer = `
		<div class="footer">
			<div class="text"><span class="txtGreen">© NATURE REPUBLIC</span>  Corp All Rights Reserved</div>
		</div>
	`;

    
    $('.sidebar-menu').html(header);
    $('.sidebar-menu .sidebar-menu').unwrap();

	$('.header-top').html(headerTop);
    $('.header-top .header-top').unwrap();

	$('.path-W').html(pathW);
    $('.path-W .path-W').unwrap();

	$('.footer').html(footer);
    $('.footer .footer').unwrap();

});