-- 공간 데이터 입력
insert into sms_space(space_id, name, adr_lms, adr_dtl, tel, intro) values('101', '지환카페', '555555', '819-4 YBM빌딩 2층', '111-222', '지환 카페 입니다.');
insert into sms_space(space_id, name, adr_lms, adr_dtl, tel, intro) values('102', '현우카페', '666655', '9 YMCA빌딩 7층', '111-222', '현우 카페 입니다.');
insert into sms_space(space_id, name, adr_lms, adr_dtl, tel, intro) values('103', '상민카페', '111111', '비트동', '111-222', '상민 카페 입니다.');
insert into sms_space(space_id, name, adr_lms, adr_dtl, tel, intro) values('104', '상현카페', '111111', '비트동', '111-222', '상현 카페 입니다.');
insert into sms_space(space_id, name, adr_lms, adr_dtl, tel, intro) values('105', '희욱카페', '111111', '비트동', '111-222', '희욱 카페 입니다.');

-- 공간 스터디룸 데이터 입력
insert into sms_space_room(space_room_id, space_id, name, photo, prsn, price) values('201', '101', '지환룸 1번방', '1번방.jpg', '4', '20000');
insert into sms_space_room(space_room_id, space_id, name, photo, prsn, price) values('202', '101', '지환룸 2번방', '2번방.jpg', '6', '40000');
insert into sms_space_room(space_room_id, space_id, name, photo, prsn, price) values('203', '101', '지환룸 3번방', '3번방.jpg', '8', '60000');

insert into sms_space_room(space_room_id, space_id, name, photo, prsn, price) values('204', '102', '현우룸 1번방', '1번방.jpg', '3', '30000');
insert into sms_space_room(space_room_id, space_id, name, photo, prsn, price) values('205', '102', '현우룸 2번방', '2번방.jpg', '6', '50000');

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
insert into sms_space_room_bkng(space_bkng_id, space_room_id, space_id, std_id, member_id, bkng_sdt, bkng_edt) 
values ('501', '201', '101', '1', '2', '2019-5-5', '2019-5-5');

insert into sms_space_room_bkng(space_bkng_id, space_room_id, space_id, std_id, member_id, bkng_sdt, bkng_edt) 
values ('502', '201', '101', '1', '3', '2019-5-6', '2019-5-6');

insert into sms_space_room_bkng(space_bkng_id, space_room_id, space_id, std_id, member_id, bkng_sdt, bkng_edt) 
values ('503', '201', '101', '2', '4', '2019-5-7', '2019-5-7');

insert into sms_space_room_bkng(space_bkng_id, space_room_id, space_id, std_id, member_id, bkng_sdt, bkng_edt) 
values ('504', '202', '101', '2', '5', '2019-5-8', '2019-5-8');

insert into sms_space_room_bkng(space_bkng_id, space_room_id, space_id, std_id, member_id, bkng_sdt, bkng_edt) 
values ('505', '202', '101', '2', '3', '2019-5-9', '2019-5-9');

-- 공간후기
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
