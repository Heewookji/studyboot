-- 스터디 테이블
-- 스터디 이름, 활동지역, 스터디 분류, ㄴ스터디 사진, 스터디 시작일, 스터디 종료일, 스터디 목표, 스터디 설명, 스터디 최대인원

-- 스터디 생성 입력
insert into sms_std(adr_lms, cls_lms, name, photo, day, sdt, edt, goal, cont, prsn)
values('000000', '000000', '스터디1', '사진1', 64, '2019-05-11', '2019-06-11', '정처기 합격', '열심히 공부합시다1.', 5);
insert into sms_std(adr_lms, cls_lms, name, photo, day, sdt, edt, goal, cont, prsn)
values('010001', '000001', '스터디2', '사진2', 1, '2019-05-12', '2019-06-12', '박상민 합격', '열심히 공부합시다2.', 3);
insert into sms_std(adr_lms, cls_lms, name, photo, day, sdt, edt, goal, cont, prsn)
values('100000', '000002', '스터디3', '사진3', 96, '2019-05-13', '2019-06-13', '박상현 합격', '열심히 공부합시다3.', 6);
insert into sms_std(adr_lms, cls_lms, name, photo, day, sdt, edt, goal, cont, prsn)
values('002000', '000003', '스터디4', '사진4', 21, '2019-05-14', '2019-06-14', '지희욱 합격', '열심히 공부합시다4.', 3);
insert into sms_std(adr_lms, cls_lms, name, photo, day, sdt, edt, goal, cont, prsn)
values('001200', '000004', '스터디5', '사진5', 3, '2019-05-15', '2019-06-15', '임현우 합격', '열심히 공부합시다5.', 5);
insert into sms_std(adr_lms, cls_lms, name, photo, day, sdt, edt, goal, cont, prsn)
values('100100', '000005', '스터디6', '사진6', 127, '2019-05-16', '2019-06-16', '최지환 합격', '열심히 공부합시다6.', 3);
insert into sms_std(adr_lms, cls_lms, name, photo, day, sdt, edt, goal, cont, prsn)
values('200010', '000006', '스터디7', '사진7', 16, '2019-05-17', '2019-06-17', '골드 합격', '열심히 공부합시다7.', 5);
insert into sms_std(adr_lms, cls_lms, name, photo, day, sdt, edt, goal, cont, prsn)
values('100002', '000007', '스터디8', '사진8', 32, '2019-05-18', '2019-06-18', '플레 합격', '열심히 공부합시다8.', 2);
insert into sms_std(adr_lms, cls_lms, name, photo, day, sdt, edt, goal, cont, prsn)
values('100002', '111111', '스터디8', '사진8', 32, '2019-05-18', '2019-06-18', '플레 합격', '열심히 공부합시다8.', 2);
insert into sms_std(adr_lms, cls_lms, name, photo, day, sdt, edt, goal, cont, prsn)
values('100002', '111211', '스터디8', '사진8', 32, '2019-05-18', '2019-06-18', '플레 합격', '열심히 공부합시다8.', 2);
insert into sms_std(adr_lms, cls_lms, name, photo, day, sdt, edt, goal, cont, prsn)
values('100002', '111311', '스터디8', '사진8', 32, '2019-05-18', '2019-06-18', '플레 합격', '열심히 공부합시다8.', 2);
insert into sms_std(adr_lms, cls_lms, name, photo, day, sdt, edt, goal, cont, prsn)
values('100002', '111144', '스터디8', '사진8', 32, '2019-05-18', '2019-06-18', '플레 합격', '열심히 공부합시다8.', 2);

insert into sms_std(adr_lms, cls_lms, name, photo, day, sdt, edt, goal, cont, prsn)
values('100002', '121111', '스터디8', '사진8', 32, '2019-05-18', '2019-06-18', '플레 합격', '열심히 공부합시다8.', 2);
insert into sms_std(adr_lms, cls_lms, name, photo, day, sdt, edt, goal, cont, prsn)
values('100002', '131111', '스터디8', '사진8', 32, '2019-05-18', '2019-06-18', '플레 합격', '열심히 공부합시다8.', 2);
insert into sms_std(adr_lms, cls_lms, name, photo, day, sdt, edt, goal, cont, prsn)
values('100002', '141111', '스터디8', '사진8', 32, '2019-05-18', '2019-06-18', '플레 합격', '열심히 공부합시다8.', 2);

-- 회원 생성
  -- 관리자
insert into sms_member (member_id, pwd, email, name, nick_name, age, tel, photo, admin, adr_lms)
  values(1, '1111', 'user1@test.com', 'user1', 'nick1', 21, '010-1111-1111', 'photo1.jpg', true, '111111');
  -- 일반
  insert into sms_member (member_id, pwd, email, name, nick_name, rate, age, tel, photo, adr_lms)
  values(2, '1111', 'user2@test.com', 'user2', 'nick2', 3.5, 22, '010-2222-2222', 'photo2.jpg', '222222');
 insert into sms_member (member_id, pwd, email, name, nick_name, rate, age, tel, photo, adr_lms)
  values(3, '1111', 'user3@test.com', 'user3', 'nick3', 4.0, 23, '010-3333-3333', 'photo3.jpg', '333333');
  insert into sms_member (member_id, pwd, email, name, nick_name, rate, age, tel, photo, adr_lms)
  values(4, '1111', 'user4@test.com', 'user4', 'nick4', 4.5, 24, '010-4444-4444', 'photo4.jpg', '444444');
  insert into sms_member (member_id, pwd, email, name, nick_name, rate, age, tel, photo, adr_lms)
  values(5, '1111', 'user5@test.com', 'user5', 'nick5', 5.0, 25, '010-5555-5555', 'photo5.jpg','555555');
insert into sms_member (member_id, pwd, email, name, nick_name, rate, age, tel, photo, adr_lms)
  values(6, '1111', 'user6@test.com', 'user4', 'nick4', 4.5, 24, '010-4444-4444', 'photo4.jpg', '444444');
  insert into sms_member (member_id, pwd, email, name, nick_name, rate, age, tel, photo, adr_lms)
  values(7, '1111', 'user7@test.com', 'user5', 'nick5', 5.0, 25, '010-5555-5555', 'photo5.jpg','555555');


  
  
  -- 스터디 회원 정보
insert into sms_std_member(std_id, member_id,leader) values(1,2,true);
insert into sms_std_member(std_id, member_id) values(1,3);
insert into sms_std_member(std_id, member_id) values(1,4);
insert into sms_std_member(std_id, member_id) values(1,5);
insert into sms_std_member(std_id, member_id) values(1,6);
insert into sms_std_member(std_id, member_id) values(1,7);


insert into sms_std_member(std_id, member_id) values(2,2);
insert into sms_std_member(std_id, member_id) values(2,3);
insert into sms_std_member(std_id, member_id) values(2,4);
insert into sms_std_member(std_id, member_id) values(2,5);
  
  
  
-- 스터디 활동일
-- 



-- 활동 지역
insert into sms_adr_l(adr_l_id, adr_l_name) values(11, '서울');
insert into sms_adr_l(adr_l_id, adr_l_name) values(12, '경기도');
insert into sms_adr_l(adr_l_id, adr_l_name) values(13, '인천');
insert into sms_adr_l(adr_l_id, adr_l_name) values(14, '대구');
insert into sms_adr_l(adr_l_id, adr_l_name) values(15, '부산');

insert into sms_adr_m(adr_m_id, adr_l_id, adr_m_name) values(11, 11, '강남구');
insert into sms_adr_m(adr_m_id, adr_l_id, adr_m_name) values(12, 11, '송파구');
insert into sms_adr_m(adr_m_id, adr_l_id, adr_m_name) values(13, 11, '노원구');
insert into sms_adr_m(adr_m_id, adr_l_id, adr_m_name) values(14, 11, '강동구');
insert into sms_adr_m(adr_m_id, adr_l_id, adr_m_name) values(15, 11, '마포구');

insert into sms_adr_s(adr_s_id, adr_m_id, adr_s_name) values(11, 11, '일원동');
insert into sms_adr_s(adr_s_id, adr_m_id, adr_s_name) values(12, 11, '개포동');
insert into sms_adr_s(adr_s_id, adr_m_id, adr_s_name) values(13, 11, '대치동');
insert into sms_adr_s(adr_s_id, adr_m_id, adr_s_name) values(14, 11, '수서동');
insert into sms_adr_s(adr_s_id, adr_m_id, adr_s_name) values(15, 11, '논현동');

-- 스터디 분류
insert into sms_std_cls_l(cls_l_id, name) values(11, 'IT');
insert into sms_std_cls_l(cls_l_id, name) values(12, '서비스');
insert into sms_std_cls_l(cls_l_id, name) values(13, '금융');
insert into sms_std_cls_l(cls_l_id, name) values(14, '예체능');
insert into sms_std_cls_l(cls_l_id, name) values(15, '인문');
insert into sms_std_cls_l(cls_l_id, name) values(16, '공학');

insert into sms_std_cls_m(cls_m_id, cls_l_id, name) values(11, 11, 'java');
insert into sms_std_cls_m(cls_m_id, cls_l_id, name) values(12, 11, 'python');
insert into sms_std_cls_m(cls_m_id, cls_l_id, name) values(13, 11, 'php');
insert into sms_std_cls_m(cls_m_id, cls_l_id, name) values(14, 11, 'c/c++');
insert into sms_std_cls_m(cls_m_id, cls_l_id, name) values(15, 11, 'javascript');

insert into sms_std_cls_m(cls_m_id, cls_l_id, name) values(11, 12, '광고대행');
insert into sms_std_cls_m(cls_m_id, cls_l_id, name) values(11, 13, '재테크');

insert into sms_std_cls_s(cls_s_id, cls_m_id, cls_l_id, name) values(11, 11, 11, 'spring');
insert into sms_std_cls_s(cls_s_id, cls_m_id, cls_l_id, name) values(12, 11, 11, 'log4j');
insert into sms_std_cls_s(cls_s_id, cls_m_id, cls_l_id, name) values(11, 12, 11, 'django');
insert into sms_std_cls_s(cls_s_id, cls_m_id, cls_l_id, name) values(11, 11, 12, '전단지');
insert into sms_std_cls_s(cls_s_id, cls_m_id, cls_l_id, name) values(11, 11, 13, '부동산');


-- 회원 평점 정보
-- 회원 평점 정보 키, 회원 번호 , 평점 , 평가일


insert into sms_member_rate_info(std_id, member_id, confirm_member_id, rate, rate_dt) values(1, 5, 2, 3.0, 20190513);
insert into sms_member_rate_info(std_id, member_id, confirm_member_id, rate, rate_dt) values(1, 5, 3, 2.5, 20190513);
insert into sms_member_rate_info(std_id, member_id, confirm_member_id, rate, rate_dt) values(1, 5, 4, 4.0, 20191013);
insert into sms_member_rate_info(std_id, member_id, confirm_member_id, rate, rate_dt) values(1, 5, 6, 1.0, 20190513);
insert into sms_member_rate_info(std_id, member_id, confirm_member_id, rate, rate_dt) values(1, 5, 7, 2.0, 20191013);


  
-- 게시판 분류 (문의,신고)생성
insert into sms_board_cls (cls_id, cls_name)
  values(1, '문의');
  insert into sms_board_cls (cls_id, cls_name)
  values(2, '신고');

-- 문의/신고 게시물 생성

  -- 문의 게시물
insert into sms_rprt_inqry (rprt_inqry_id, cls_id, inqry_id, cont)
  values(1, 1, 2, '2번 회원의 문의 내용이 들어갑니다.');
  insert into sms_rprt_inqry (rprt_inqry_id, cls_id, inqry_id, cont)
  values(2, 1, 3, '3번 회원의 문의 내용이 들어갑니다.');
  insert into sms_rprt_inqry (rprt_inqry_id, cls_id, inqry_id, cont)
  values(3, 1, 4, '4번 회원의 문의 내용이 들어갑니다.');
  
  -- 신고 게시물
  insert into sms_rprt_inqry (rprt_inqry_id, cls_id, inqry_id, sspct_id, cont)
  values(4, 2, 2, 3, '2번 회원의 3번 회원에 대한 신고 내용이 들어갑니다.');
  insert into sms_rprt_inqry (rprt_inqry_id, cls_id, inqry_id, sspct_id, cont)
  values(5, 2, 3, 4, '3번 회원의 4번 회원에 대한 신고 내용이 들어갑니다.');
  insert into sms_rprt_inqry (rprt_inqry_id, cls_id, inqry_id, sspct_id, cont)
  values(6, 2, 4, 5, '4번 회원의 5번 회원에 대한 신고 내용이 들어갑니다.');

insert into sms_rprt_inqry (rprt_inqry_id, cls_id, inqry_id, sspct_id, cont)
  values(7, 2, 3, 2, '3번 회원의 2번 회원에 대한 신고 내용이 들어갑니다.');
  insert into sms_rprt_inqry (rprt_inqry_id, cls_id, inqry_id, sspct_id, cont)
  values(8, 2, 4, 2, '4번 회원의 2번 회원에 대한 신고 내용이 들어갑니다.');
  insert into sms_rprt_inqry (rprt_inqry_id, cls_id, inqry_id, sspct_id, cont)
  values(9, 2, 5, 4, '5번 회원의 4번 회원에 대한 신고 내용이 들어갑니다.');

  insert into sms_rprt_inqry (rprt_inqry_id, cls_id, inqry_id, cont)
  values(10, 1, 2, '2번 회원의 문의 내용이 들어갑니다.');
  insert into sms_rprt_inqry (rprt_inqry_id, cls_id, inqry_id, cont)
  values(11, 1, 3, '3번 회원의 문의 내용이 들어갑니다.');
  insert into sms_rprt_inqry (rprt_inqry_id, cls_id, inqry_id, cont)
  values(12, 1, 4, '4번 회원의 문의 내용이 들어갑니다.');
  

  
  -- 공간 데이터 입력
insert into sms_space(space_id, name, adr_lms, adr_dtl, tel, intro) values('101', '지환카페', '111111', '비트동', '111-222', '지환 카페 입니다.');
insert into sms_space(space_id, name, adr_lms, adr_dtl, tel, intro) values('102', '현우카페', '222222', '비트동', '111-222', '현우 카페 입니다.');
insert into sms_space(space_id, name, adr_lms, adr_dtl, tel, intro) values('103', '상민카페', '333333', '비트동', '111-222', '상민 카페 입니다.');
insert into sms_space(space_id, name, adr_lms, adr_dtl, tel, intro) values('104', '상현카페', '444444', '비트동', '111-222', '상현 카페 입니다.');
insert into sms_space(space_id, name, adr_lms, adr_dtl, tel, intro) values('105', '희욱카페', '555555', '비트동', '111-222', '희욱 카페 입니다.');

-- 공간 스터디룸 데이터 입력
insert into sms_space_room(space_room_id, space_id, name, photo, prsn, price) values('201', '101', '지환룸 1번방', '1번방.jgp', '4', '20000');
insert into sms_space_room(space_room_id, space_id, name, photo, prsn, price) values('202', '101', '지환룸 2번방', '2번방.jgp', '6', '40000');
insert into sms_space_room(space_room_id, space_id, name, photo, prsn, price) values('203', '101', '지환룸 3번방', '3번방.jgp', '8', '60000');

insert into sms_space_room(space_room_id, space_id, name, photo, prsn, price) values('204', '102', '현우룸 1번방', '1번방.jgp', '3', '30000');
insert into sms_space_room(space_room_id, space_id, name, photo, prsn, price) values('205', '102', '현우룸 2번방', '2번방.jgp', '6', '50000');

-- 공간 태그 데이터 입력
insert into sms_tag(tag_id, space_id, name) values('301', '101', '#강남');
insert into sms_tag(tag_id, space_id, name) values('302', '101', '#지환');
insert into sms_tag(tag_id, space_id, name) values('303', '101', '#카페');

insert into sms_tag(tag_id, space_id, name) values('304', '102', '#성남');
insert into sms_tag(tag_id, space_id, name) values('305', '102', '#현우');
insert into sms_tag(tag_id, space_id, name) values('306', '102', '#스터디');

-- 공간 사진
insert into sms_space_photo(space_photo_id, space_id, photo) values('401', '101', '지환카페1.jpg');
insert into sms_space_photo(space_photo_id, space_id, photo) values('402', '101', '지환카페2.jpg');
insert into sms_space_photo(space_photo_id, space_id, photo) values('403', '101', '지환카페3.jpg');
insert into sms_space_photo(space_photo_id, space_id, photo) values('404', '101', '지환카페4.jpg');

insert into sms_space_photo(space_photo_id, space_id, photo) values('405', '102', '현우카페1.jpg');
insert into sms_space_photo(space_photo_id, space_id, photo) values('406', '102', '현우카페2.jpg');
insert into sms_space_photo(space_photo_id, space_id, photo) values('407', '102', '현우카페3.jpg');
insert into sms_space_photo(space_photo_id, space_id, photo) values('408', '102', '현우카페4.jpg');

-- 편의시설
insert into sms_conv(conv_id, name) values('1', '와이파이');
insert into sms_conv(conv_id, name) values('2', '의자/테이블');
insert into sms_conv(conv_id, name) values('3', '내부 화장실');
insert into sms_conv(conv_id, name) values('4', '음식물 반입가능');
insert into sms_conv(conv_id, name) values('5', '흡연실');
insert into sms_conv(conv_id, name) values('6', '주차 가능');
insert into sms_conv(conv_id, name) values('7', 'PC/노트북');
insert into sms_conv(conv_id, name) values('8', '화이트보드');
insert into sms_conv(conv_id, name) values('9', 'TV/프로젝터');
insert into sms_conv(conv_id, name) values('10', '복사/인쇄기');
insert into sms_conv(conv_id, name) values('11', '음향/마이크');
insert into sms_conv(conv_id, name) values('12', '에어컨');

-- 공간 편의시설
insert into sms_space_conv_info(conv_id, space_id, note) values('6', '101', '주차요금은 만원입니다');
insert into sms_space_conv_info(conv_id, space_id, note) values('1', '101', '와이파이는 기가 와이파이입니다');

insert into sms_space_conv_info(conv_id, space_id, note) values('12', '102', '에어컨 설치되어있습니다');
insert into sms_space_conv_info(conv_id, space_id, note) values('4', '102', '음료만 반입 가능합니다');



-- 공간휴일
insert into sms_rest_day(space_id, rest_day) values('101', '2019-5-20');
insert into sms_rest_day(space_id, rest_day) values('102', '2019-6-1');


-- 스터디룸 예약
insert into sms_space_room_bkng(space_bkng_id, space_room_id, std_id, member_id, bkng_sdt, bkng_edt,space_id) 
values (1, '201', '1', '2', '2019-5-5', '2019-5-5',101);

insert into sms_space_room_bkng(space_bkng_id, space_room_id, std_id, member_id, bkng_sdt, bkng_edt,space_id) 
values (2, '201', '1', '3', '2019-5-5', '2019-5-5',101);

insert into sms_space_room_bkng(space_bkng_id, space_room_id, std_id, member_id, bkng_sdt, bkng_edt,space_id) 
values (3, '201', '1', '4', '2019-5-5', '2019-5-5',101);

insert into sms_space_room_bkng(space_bkng_id, space_room_id, std_id, member_id, bkng_sdt, bkng_edt,space_id) 
values (4, '201', '1', '5', '2019-5-5','2019-5-5',101);

insert into sms_space_room_bkng(space_bkng_id, space_room_id, std_id, member_id, bkng_sdt, bkng_edt,space_id) 
values (5, '202', '2', '2', '2019-5-10', '2019-5-10',101);

  
  insert into sms_space_room_bkng ( space_room_id, space_id, std_id, member_id, bkng_sdt, bkng_edt)
  values (201,101,1,2,'2019-05-17 09:00','2019-05-17 09:50');
   insert into sms_space_room_bkng ( space_room_id, space_id, std_id, member_id, bkng_sdt, bkng_edt)
  values (202,101,1,2,'2019-05-17 10:00','2019-05-17 10:50');
    insert into sms_space_room_bkng ( space_room_id, space_id, std_id, member_id, bkng_sdt, bkng_edt)
  values (203,101,1,2,'2019-05-17 11:00','2019-05-17 11:50');
   insert into sms_space_room_bkng ( space_room_id, space_id, std_id, member_id, bkng_sdt, bkng_edt)
  values (201,101,1,2,'2019-05-17 12:00','2019-05-17 12:50');
    insert into sms_space_room_bkng ( space_room_id, space_id, std_id, member_id, bkng_sdt, bkng_edt)
  values (202,101,1,2,'2019-05-17 13:00','2019-05-17 13:50');
   insert into sms_space_room_bkng ( space_room_id, space_id, std_id, member_id, bkng_sdt, bkng_edt)
  values (203,101,1,2,'2019-05-17 14:00','2019-05-17 14:50');
     insert into sms_space_room_bkng ( space_room_id, space_id, std_id, member_id, bkng_sdt, bkng_edt)
  values (204,102,1,2,'2019-05-17 20:00','2019-05-17 20:50');
  
insert into sms_space_review(space_review_id, member_id, space_id, rating, review)
values ('601', '2', '101', '3.0', '그저그래요');
insert into sms_space_review(space_review_id, member_id, space_id, rating, review)
values ('602', '3', '101', '5.0', '완벽합니다 너무 좋네요');
insert into sms_space_review(space_review_id, member_id, space_id, rating, review)
values ('603', '4', '101', '1.5', '에어컨이 잘 안나오네요');
insert into sms_space_review(space_review_id, member_id, space_id, rating, review)
values ('604', '5', '101', '4.0', '사장님이 친절해요');
insert into sms_space_review(space_review_id, member_id, space_id, rating, review)
values ('605', '3', '101', '3.5', '좋아요');


