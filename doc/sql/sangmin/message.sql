-- 회원 생성
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

update sms_member set nick_name = 'nick6' where member_id=6;
update sms_member set nick_name = 'nick7' where member_id=7;
  
  
-- 쪽지 샘플 데이텅
insert into sms_msg(send_id, recv_id, titl, cont)
values(7, 6, "제목1", "7번이 6번에게 쪽지 보냄4");
insert into sms_msg(send_id, recv_id, titl, cont)
values(7, 6, "제목2","7번이 6번에게 쪽지 보냄5");
insert into sms_msg(send_id, recv_id, titl, cont)
values(7, 6, "제목3","7번이 6번에게 쪽지 보냄6");
insert into sms_msg(send_id, recv_id, titl, cont)
values(7, 6, "제목4","7번이 6번에게 쪽지 보냄7");
insert into sms_msg(send_id, recv_id, titl, cont)
values(7, 6, "제목5","7번이 6번에게 쪽지 보냄8");
insert into sms_msg(send_id, recv_id, titl, cont)
values(7, 6, "제목6","7번이 6번에게 쪽지 보냄9");
insert into sms_msg(send_id, recv_id, titl, cont)
values(7, 6, "제목7","7번이 6번에게 쪽지 보냄10");
insert into sms_msg(send_id, recv_id, titl, cont)
values(7, 6, "제목8","7번이 6번에게 쪽지 보냄11");

insert into sms_msg(send_id, recv_id, titl, cont) values(6, 5, "제목1","6번이 5번에게 쪽지 보냄1");
insert into sms_msg(send_id, recv_id, titl, cont) values(6, 5, "제목2","6번이 5번에게 쪽지 보냄2");
insert into sms_msg(send_id, recv_id, titl, cont) values(6, 5, "제목3","6번이 5번에게 쪽지 보냄3");
insert into sms_msg(send_id, recv_id, titl, cont) values(6, 7, "제목1","6번이 7번에게 쪽지 보냄1");
insert into sms_msg(send_id, recv_id, titl, cont) values(6, 7, "제목2","6번이 7번에게 쪽지 보냄2");
insert into sms_msg(send_id, recv_id, titl, cont) values(6, 7, "제목3","6번이 7번에게 쪽지 보냄3");
insert into sms_msg(send_id, recv_id, titl, cont) values(6, 7, "제목4","6번이 7번에게 쪽지 보냄4");
insert into sms_msg(send_id, recv_id, titl, cont) values(6, 4, "제목입니다.","6번이 4번에게 쪽지 보냄");
insert into sms_msg(send_id, recv_id, titl, cont) values(6, 4, "제목입니다.","6번이 4번에게 쪽지 보냄");
