-- 스터디 테이블
-- 스터디 이름, 활동지역, 스터디 분류, ㄴ스터디 사진, 스터디 시작일, 스터디 종료일, 스터디 목표, 스터디 설명, 스터디 최대인원

-- 스터디 생성 입력
insert into sms_std(adr_lms, cls_lms, name, photo, day, sdt, edt, goal, cont, prsn, rate)
values('000000', '000000', '스터디1', '사진1', 64, '2019-05-11', '2019-06-11', '정처기 합격', '열심히 공부합시다1.', 5 , 3);
insert into sms_std(adr_lms, cls_lms, name, photo, day, sdt, edt, goal, cont, prsn, rate)
values('010001', '000001', '스터디2', '사진2', 1, '2019-05-12', '2019-06-12', '박상민 합격', '열심히 공부합시다2.', 3 , 3);
insert into sms_std(adr_lms, cls_lms, name, photo, day, sdt, edt, goal, cont, prsn, rate)
values('100000', '000002', '스터디3', '사진3', 96, '2019-05-13', '2019-06-13', '박상현 합격', '열심히 공부합시다3.', 6, 3 );
insert into sms_std(adr_lms, cls_lms, name, photo, day, sdt, edt, goal, cont, prsn, rate)
values('002000', '000003', '스터디4', '사진4', 21, '2019-05-14', '2019-06-14', '지희욱 합격', '열심히 공부합시다4.', 3, 3);
insert into sms_std(adr_lms, cls_lms, name, photo, day, sdt, edt, goal, cont, prsn, rate)
values('001200', '000004', '스터디5', '사진5', 3, '2019-05-15', '2019-06-15', '임현우 합격', '열심히 공부합시다5.', 5, 3);
insert into sms_std(adr_lms, cls_lms, name, photo, day, sdt, edt, goal, cont, prsn, rate)
values('100100', '000005', '스터디6', '사진6', 127, '2019-05-16', '2019-06-16', '최지환 합격', '열심히 공부합시다6.', 3, 3);
insert into sms_std(adr_lms, cls_lms, name, photo, day, sdt, edt, goal, cont, prsn, rate)
values('200010', '000006', '스터디7', '사진7', 16, '2019-05-17', '2019-06-17', '골드 합격', '열심히 공부합시다7.', 5, 3);
insert into sms_std(adr_lms, cls_lms, name, photo, day, sdt, edt, goal, cont, prsn, rate)
values('100002', '000007', '스터디8', '사진8', 32, '2019-05-18', '2019-06-18', '플레 합격', '열심히 공부합시다8.', 2, 3);


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

insert into sms_std_cls_s(cls_s_id, cls_m_id, name) values(11, 11, 'spring');
insert into sms_std_cls_s(cls_s_id, cls_m_id, name) values(12, 11, 'log4j');
insert into sms_std_cls_s(cls_s_id, cls_m_id, name) values(13, 11, 'jsp');
insert into sms_std_cls_s(cls_s_id, cls_m_id, name) values(14, 11, 'servlet');
insert into sms_std_cls_s(cls_s_id, cls_m_id, name) values(15, 11, 'list');


-- 회원 평점 정보
-- 회원 평점 정보 키, 회원 번호 , 평점 , 평가일

insert into sms_member_rate_info(std_id, member_id, rate, rate_dt) values(1, 2, 3.0, 20190513);
insert into sms_member_rate_info(std_id, member_id, rate, rate_dt) values(1, 2, 2.5, 20190513);
insert into sms_member_rate_info(std_id, member_id, rate, rate_dt) values(1, 2, 4.0, 20191013);
insert into sms_member_rate_info(std_id, member_id, rate, rate_dt) values(1, 2, 4.0, 20190513);

insert into sms_member_rate_info(std_id, member_id, rate, rate_dt) values(2, 2, 3.0, 20190513);
insert into sms_member_rate_info(std_id, member_id, rate, rate_dt) values(2, 2, 2.5, 20190513);
insert into sms_member_rate_info(std_id, member_id, rate, rate_dt) values(2, 2, 4.0, 20191013);
insert into sms_member_rate_info(std_id, member_id, rate, rate_dt) values(2, 2, 4.0, 20190513);

-- 스터디 회원 정보
insert into sms_std_member(std_id, member_id) values(1,2);
insert into sms_std_member(std_id, member_id) values(1,3);
insert into sms_std_member(std_id, member_id) values(1,4);
insert into sms_std_member(std_id, member_id) values(1,5);

insert into sms_std_member(std_id, member_id) values(2,2);
insert into sms_std_member(std_id, member_id) values(2,3);
insert into sms_std_member(std_id, member_id) values(2,4);
insert into sms_std_member(std_id, member_id) values(2,5);

                               
                               

