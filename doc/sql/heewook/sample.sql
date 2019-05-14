<<<<<<< HEAD
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
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
=======
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


  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
>>>>>>> branch 'master' of https://github.com/ppappikko/study-web-project.git
