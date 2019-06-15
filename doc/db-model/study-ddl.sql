-- 회원
DROP TABLE IF EXISTS sms_member RESTRICT;

-- 스터디
DROP TABLE IF EXISTS sms_std RESTRICT;

-- 스터디일정
DROP TABLE IF EXISTS sms_std_schdl RESTRICT;

-- 스터디자료실
DROP TABLE IF EXISTS sms_std_arch RESTRICT;

-- 공간
DROP TABLE IF EXISTS sms_space RESTRICT;

-- 쪽지
DROP TABLE IF EXISTS sms_msg RESTRICT;

-- 스터디 게시판
DROP TABLE IF EXISTS sms_std_board RESTRICT;

-- 스터디대분류
DROP TABLE IF EXISTS sms_std_cls_l RESTRICT;

-- 스터디중분류
DROP TABLE IF EXISTS sms_std_cls_m RESTRICT;

-- 스터디소분류
DROP TABLE IF EXISTS sms_std_cls_s RESTRICT;

-- 스터디회원
DROP TABLE IF EXISTS sms_std_member RESTRICT;

-- 문의신고게시판
DROP TABLE IF EXISTS sms_rprt_inqry RESTRICT;

-- 스터디룸
DROP TABLE IF EXISTS sms_space_room RESTRICT;

-- 태그
DROP TABLE IF EXISTS sms_tag RESTRICT;

-- 스터디출석
DROP TABLE IF EXISTS sms_std_atnd RESTRICT;

-- 공간편의시설
DROP TABLE IF EXISTS sms_space_conv_info RESTRICT;

-- 공간 사진
DROP TABLE IF EXISTS sms_space_photo RESTRICT;

-- 스터디룸 예약
DROP TABLE IF EXISTS sms_space_room_bkng RESTRICT;

-- 활동지역 대분류
DROP TABLE IF EXISTS sms_adr_l RESTRICT;

-- 활동지역 중분류
DROP TABLE IF EXISTS sms_adr_m RESTRICT;

-- 활동지역 소분류
DROP TABLE IF EXISTS sms_adr_s RESTRICT;

-- 신청 스터디
DROP TABLE IF EXISTS sms_apl_std RESTRICT;

-- 찜한 스터디
DROP TABLE IF EXISTS sms_pick_std RESTRICT;

-- 회원 자료실
DROP TABLE IF EXISTS sms_member_arch RESTRICT;

-- 회원 평점 정보
DROP TABLE IF EXISTS sms_member_rate_info RESTRICT;

-- 게시판분류
DROP TABLE IF EXISTS sms_board_cls RESTRICT;

-- 탈퇴추방완료분류
DROP TABLE IF EXISTS sms_end_state_cls RESTRICT;

-- 편의시설
DROP TABLE IF EXISTS sms_conv RESTRICT;

-- 공간휴일
DROP TABLE IF EXISTS sms_rest_day RESTRICT;

-- 공간후기
DROP TABLE IF EXISTS sms_space_review RESTRICT;

-- 관심분야
DROP TABLE IF EXISTS sms_member_cls RESTRICT;

-- 탈퇴 회원 정보
DROP TABLE IF EXISTS sms_member_retire RESTRICT;

-- 회원 평점 기록
DROP TABLE IF EXISTS sms_member_rate_log RESTRICT;

-- 회원
CREATE TABLE sms_member (
  member_id INTEGER      NOT NULL COMMENT '회원번호', -- 회원번호
  pwd       VARCHAR(100) NULL     COMMENT '암호', -- 암호
  email     VARCHAR(40)  NOT NULL COMMENT '이메일', -- 이메일
  nick_name VARCHAR(50)  NOT NULL COMMENT '닉네임', -- 닉네임
  join_date DATE         NULL     DEFAULT current_date() COMMENT '가입일', -- 가입일
  name      VARCHAR(50)  NOT NULL COMMENT '이름', -- 이름
  rate      DOUBLE       NOT NULL DEFAULT 3.0 COMMENT '현재평점', -- 현재평점
  birth     DATE         NULL     COMMENT '생년월일', -- 생년월일
  tel       VARCHAR(30)  NULL     COMMENT '전화', -- 전화
  photo     VARCHAR(255) NULL     DEFAULT "defaultphoto" COMMENT '사진', -- 사진
  admin     BOOLEAN      NOT NULL DEFAULT false COMMENT '관리자여부', -- 관리자여부
  adr_lms   CHAR(6)      NULL     COMMENT '활동지역' -- 활동지역
)
COMMENT '회원';

-- 회원
ALTER TABLE sms_member
  ADD CONSTRAINT PK_sms_member -- 회원 기본키
    PRIMARY KEY (
      member_id -- 회원번호
    );

-- 회원 유니크 인덱스
CREATE UNIQUE INDEX UIX_sms_member
  ON sms_member ( -- 회원
    email ASC -- 이메일
  );

ALTER TABLE sms_member
  MODIFY COLUMN member_id INTEGER NOT NULL AUTO_INCREMENT COMMENT '회원번호';

-- 스터디
CREATE TABLE sms_std (
  std_id      INTEGER      NOT NULL COMMENT '스터디번호', -- 스터디번호
  adr_lms     CHAR(6)      NOT NULL COMMENT '활동지역', -- 활동지역
  cls_lms     CHAR(6)      NOT NULL COMMENT '스터디분류', -- 스터디분류
  name        VARCHAR(50)  NOT NULL COMMENT '스터디 이름', -- 스터디 이름
  photo       VARCHAR(255) NOT NULL COMMENT '스터디 사진', -- 스터디 사진
  day         INTEGER      NOT NULL COMMENT '스터디 활동일', -- 스터디 활동일
  sdt         DATE         NOT NULL COMMENT '스터디 시작일', -- 스터디 시작일
  edt         DATE         NOT NULL COMMENT '스터디 종료일', -- 스터디 종료일
  rcrtm_state BOOLEAN      NOT NULL DEFAULT true COMMENT '모집상태여부', -- 모집상태여부
  goal        VARCHAR(100) NOT NULL COMMENT '스터디 목표', -- 스터디 목표
  rcrtm_apply BOOLEAN      NULL     COMMENT '모집 선언', -- 모집 선언
  cont        TEXT         NOT NULL COMMENT '스터디 설명', -- 스터디 설명
  prsn        INTEGER      NOT NULL COMMENT '스터디 최대인원', -- 스터디 최대인원
  now_prsn    INTEGER      NOT NULL DEFAULT 1 COMMENT '스터디 현재인원', -- 스터디 현재인원
  rate        DOUBLE       NOT NULL DEFAULT 0.0 COMMENT '스터디원 평균 평점' -- 스터디원 평균 평점
)
COMMENT '스터디';

-- 스터디
ALTER TABLE sms_std
  ADD CONSTRAINT PK_sms_std -- 스터디 기본키
    PRIMARY KEY (
      std_id -- 스터디번호
    );

ALTER TABLE sms_std
  MODIFY COLUMN std_id INTEGER NOT NULL AUTO_INCREMENT COMMENT '스터디번호';

-- 스터디일정
CREATE TABLE sms_std_schdl (
  std_schdl_id  INTEGER     NOT NULL COMMENT '스터디일정번호', -- 스터디일정번호
  std_id        INTEGER     NOT NULL COMMENT '스터디번호', -- 스터디번호
  member_id     INTEGER     NOT NULL COMMENT '회원번호', -- 회원번호
  space_bkng_id INTEGER     NULL     COMMENT '스터디룸예약번호', -- 스터디룸예약번호
  name          VARCHAR(50) NOT NULL COMMENT '이름', -- 이름
  schdl_sdt     DATETIME    NOT NULL DEFAULT current_timestamp() COMMENT '시작 일시', -- 시작 일시
  schdl_edt     DATETIME    NOT NULL COMMENT '종료 일시', -- 종료 일시
  memo          TEXT        NULL     COMMENT '메모' -- 메모
)
COMMENT '스터디일정';

-- 스터디일정
ALTER TABLE sms_std_schdl
  ADD CONSTRAINT PK_sms_std_schdl -- 스터디일정 기본키
    PRIMARY KEY (
      std_schdl_id -- 스터디일정번호
    );

ALTER TABLE sms_std_schdl
  MODIFY COLUMN std_schdl_id INTEGER NOT NULL AUTO_INCREMENT COMMENT '스터디일정번호';

-- 스터디자료실
CREATE TABLE sms_std_arch (
  std_arch_id INTEGER      NOT NULL COMMENT '자료실번호', -- 자료실번호
  std_id      INTEGER      NOT NULL COMMENT '스터디번호', -- 스터디번호
  member_id   INTEGER      NOT NULL COMMENT '회원번호', -- 회원번호
  file_path   VARCHAR(255) NOT NULL COMMENT '파일경로', -- 파일경로
  rgstr_dt    DATETIME     NOT NULL DEFAULT current_timestamp() COMMENT '등록일시' -- 등록일시
)
COMMENT '스터디자료실';

-- 스터디자료실
ALTER TABLE sms_std_arch
  ADD CONSTRAINT PK_sms_std_arch -- 스터디자료실 기본키
    PRIMARY KEY (
      std_arch_id -- 자료실번호
    );

-- 스터디자료실 유니크 인덱스
CREATE UNIQUE INDEX UIX_sms_std_arch
  ON sms_std_arch ( -- 스터디자료실
    file_path ASC -- 파일경로
  );

ALTER TABLE sms_std_arch
  MODIFY COLUMN std_arch_id INTEGER NOT NULL AUTO_INCREMENT COMMENT '자료실번호';

-- 공간
CREATE TABLE sms_space (
  space_id INTEGER      NOT NULL COMMENT '공간 번호', -- 공간 번호
  name     VARCHAR(50)  NOT NULL COMMENT '공간 이름', -- 공간 이름
  adr_lms  CHAR(6)      NOT NULL COMMENT '공간 주소', -- 공간 주소
  adr_dtl  VARCHAR(255) NOT NULL COMMENT '공간 상세주소', -- 공간 상세주소
  tel      VARCHAR(30)  NOT NULL COMMENT '연락처', -- 연락처
  intro    TEXT         NOT NULL COMMENT '공간 소개말' -- 공간 소개말
)
COMMENT '공간';

-- 공간
ALTER TABLE sms_space
  ADD CONSTRAINT PK_sms_space -- 공간 기본키
    PRIMARY KEY (
      space_id -- 공간 번호
    );

ALTER TABLE sms_space
  MODIFY COLUMN space_id INTEGER NOT NULL AUTO_INCREMENT COMMENT '공간 번호';

-- 쪽지
CREATE TABLE sms_msg (
  msg_id  INTEGER     NOT NULL COMMENT '쪽지 번호', -- 쪽지 번호
  send_id INTEGER     NOT NULL COMMENT '보내는회원번호', -- 보내는회원번호
  recv_id INTEGER     NOT NULL COMMENT '받는회원번호', -- 받는회원번호
  titl    VARCHAR(50) NOT NULL COMMENT '제목', -- 제목
  cont    TEXT        NOT NULL COMMENT '내용', -- 내용
  dt      DATETIME    NOT NULL DEFAULT current_timestamp() COMMENT '일시' -- 일시
)
COMMENT '쪽지';

-- 쪽지
ALTER TABLE sms_msg
  ADD CONSTRAINT PK_sms_msg -- 쪽지 기본키
    PRIMARY KEY (
      msg_id -- 쪽지 번호
    );

ALTER TABLE sms_msg
  MODIFY COLUMN msg_id INTEGER NOT NULL AUTO_INCREMENT COMMENT '쪽지 번호';

-- 스터디 게시판
CREATE TABLE sms_std_board (
  std_board_id INTEGER      NOT NULL COMMENT '스터디게시판번호', -- 스터디게시판번호
  std_id       INTEGER      NOT NULL COMMENT '스터디번호', -- 스터디번호
  member_id    INTEGER      NOT NULL COMMENT '회원번호', -- 회원번호
  ntc          BOOLEAN      NOT NULL DEFAULT false COMMENT '공지사항여부', -- 공지사항여부
  title        VARCHAR(100) NOT NULL COMMENT '제목', -- 제목
  cont         TEXT         NOT NULL COMMENT '내용', -- 내용
  rgstr_dt     DATETIME     NOT NULL DEFAULT current_timestamp() COMMENT '등록일시', -- 등록일시
  vw_cnt       INTEGER      NOT NULL DEFAULT 0 COMMENT '조회수' -- 조회수
)
COMMENT '스터디 게시판';

-- 스터디 게시판
ALTER TABLE sms_std_board
  ADD CONSTRAINT PK_sms_std_board -- 스터디 게시판 기본키
    PRIMARY KEY (
      std_board_id -- 스터디게시판번호
    );

ALTER TABLE sms_std_board
  MODIFY COLUMN std_board_id INTEGER NOT NULL AUTO_INCREMENT COMMENT '스터디게시판번호';

-- 스터디대분류
CREATE TABLE sms_std_cls_l (
  cls_l_id CHAR(2)     NOT NULL COMMENT '대분류번호', -- 대분류번호
  name     VARCHAR(50) NOT NULL COMMENT '이름' -- 이름
)
COMMENT '스터디대분류';

-- 스터디대분류
ALTER TABLE sms_std_cls_l
  ADD CONSTRAINT PK_sms_std_cls_l -- 스터디대분류 기본키
    PRIMARY KEY (
      cls_l_id -- 대분류번호
    );

-- 스터디중분류
CREATE TABLE sms_std_cls_m (
  cls_m_id CHAR(2)     NOT NULL COMMENT '중분류번호', -- 중분류번호
  cls_l_id CHAR(2)     NOT NULL COMMENT '대분류번호', -- 대분류번호
  name     VARCHAR(50) NOT NULL COMMENT '이름' -- 이름
)
COMMENT '스터디중분류';

-- 스터디중분류
ALTER TABLE sms_std_cls_m
  ADD CONSTRAINT PK_sms_std_cls_m -- 스터디중분류 기본키
    PRIMARY KEY (
      cls_m_id, -- 중분류번호
      cls_l_id  -- 대분류번호
    );

-- 스터디소분류
CREATE TABLE sms_std_cls_s (
  cls_s_id CHAR(2)     NOT NULL COMMENT '소분류번호', -- 소분류번호
  cls_m_id CHAR(2)     NOT NULL COMMENT '중분류번호', -- 중분류번호
  cls_l_id CHAR(2)     NOT NULL COMMENT '대분류번호', -- 대분류번호
  name     VARCHAR(50) NOT NULL COMMENT '이름' -- 이름
)
COMMENT '스터디소분류';

-- 스터디소분류
ALTER TABLE sms_std_cls_s
  ADD CONSTRAINT PK_sms_std_cls_s -- 스터디소분류 기본키
    PRIMARY KEY (
      cls_s_id, -- 소분류번호
      cls_m_id, -- 중분류번호
      cls_l_id  -- 대분류번호
    );

-- 스터디회원
CREATE TABLE sms_std_member (
  std_id           INTEGER NOT NULL COMMENT '스터디번호', -- 스터디번호
  member_id        INTEGER NOT NULL COMMENT '회원번호', -- 회원번호
  end_state_cls_id INTEGER NULL     COMMENT '탙퇴추방완료분류번호', -- 탙퇴추방완료분류번호
  join_date        DATE    NOT NULL DEFAULT current_date() COMMENT '스터디 가입일', -- 스터디 가입일
  end_date         DATE    NULL     COMMENT '스터디원 종료일', -- 스터디원 종료일
  leader           BOOLEAN NOT NULL DEFAULT false COMMENT '스터디장여부', -- 스터디장여부
  atn_pct          DOUBLE  NULL     COMMENT '스터디 출석율', -- 스터디 출석율
  arch_cnt         INTEGER NULL     COMMENT '업로드 횟수' -- 업로드 횟수
)
COMMENT '스터디회원';

-- 스터디회원
ALTER TABLE sms_std_member
  ADD CONSTRAINT PK_sms_std_member -- 스터디회원 기본키
    PRIMARY KEY (
      std_id,    -- 스터디번호
      member_id  -- 회원번호
    );

-- 문의신고게시판
CREATE TABLE sms_rprt_inqry (
  rprt_inqry_id INTEGER  NOT NULL COMMENT '번호', -- 번호
  cls_id        INTEGER  NOT NULL COMMENT '게시판분류번호', -- 게시판분류번호
  inqry_id      INTEGER  NOT NULL COMMENT '문의자번호', -- 문의자번호
  sspct_id      INTEGER  NULL     COMMENT '피신고자번호', -- 피신고자번호
  send_dt       DATETIME NOT NULL DEFAULT current_timestamp() COMMENT '보낸 일시', -- 보낸 일시
  cont          TEXT     NOT NULL COMMENT '내용' -- 내용
)
COMMENT '문의신고게시판';

-- 문의신고게시판
ALTER TABLE sms_rprt_inqry
  ADD CONSTRAINT PK_sms_rprt_inqry -- 문의신고게시판 기본키
    PRIMARY KEY (
      rprt_inqry_id -- 번호
    );

ALTER TABLE sms_rprt_inqry
  MODIFY COLUMN rprt_inqry_id INTEGER NOT NULL AUTO_INCREMENT COMMENT '번호';

-- 스터디룸
CREATE TABLE sms_space_room (
  space_room_id INTEGER      NOT NULL COMMENT '스터디룸 번호', -- 스터디룸 번호
  space_id      INTEGER      NOT NULL COMMENT '공간 번호', -- 공간 번호
  name          VARCHAR(50)  NOT NULL COMMENT '룸이름', -- 룸이름
  photo         VARCHAR(255) NOT NULL COMMENT '룸 사진', -- 룸 사진
  prsn          INTEGER      NOT NULL COMMENT '제한 인원', -- 제한 인원
  price         INTEGER      NOT NULL COMMENT '예약 비용' -- 예약 비용
)
COMMENT '스터디룸';

-- 스터디룸
ALTER TABLE sms_space_room
  ADD CONSTRAINT PK_sms_space_room -- 스터디룸 기본키
    PRIMARY KEY (
      space_room_id, -- 스터디룸 번호
      space_id       -- 공간 번호
    );

ALTER TABLE sms_space_room
  MODIFY COLUMN space_room_id INTEGER NOT NULL AUTO_INCREMENT COMMENT '스터디룸 번호';

-- 태그
CREATE TABLE sms_tag (
  tag_id   INTEGER     NOT NULL COMMENT '태그번호', -- 태그번호
  space_id INTEGER     NOT NULL COMMENT '공간 번호', -- 공간 번호
  name     VARCHAR(50) NOT NULL COMMENT '태그 이름' -- 태그 이름
)
COMMENT '태그';

-- 태그
ALTER TABLE sms_tag
  ADD CONSTRAINT PK_sms_tag -- 태그 기본키
    PRIMARY KEY (
      tag_id -- 태그번호
    );

ALTER TABLE sms_tag
  MODIFY COLUMN tag_id INTEGER NOT NULL AUTO_INCREMENT COMMENT '태그번호';

-- 스터디출석
CREATE TABLE sms_std_atnd (
  std_atnd_id INTEGER NOT NULL COMMENT '스터디일정번호', -- 스터디일정번호
  std_id      INTEGER NOT NULL COMMENT '스터디번호', -- 스터디번호
  member_id   INTEGER NOT NULL COMMENT '회원번호' -- 회원번호
)
COMMENT '스터디출석';

-- 스터디출석
ALTER TABLE sms_std_atnd
  ADD CONSTRAINT PK_sms_std_atnd -- 스터디출석 기본키
    PRIMARY KEY (
      std_atnd_id, -- 스터디일정번호
      std_id,      -- 스터디번호
      member_id    -- 회원번호
    );

-- 공간편의시설
CREATE TABLE sms_space_conv_info (
  conv_id  INTEGER NOT NULL COMMENT '편의시설번호', -- 편의시설번호
  space_id INTEGER NOT NULL COMMENT '공간 번호', -- 공간 번호
  note     TEXT    NULL     COMMENT '비고' -- 비고
)
COMMENT '공간편의시설';

-- 공간편의시설
ALTER TABLE sms_space_conv_info
  ADD CONSTRAINT PK_sms_space_conv_info -- 공간편의시설 기본키
    PRIMARY KEY (
      conv_id,  -- 편의시설번호
      space_id  -- 공간 번호
    );

-- 공간 사진
CREATE TABLE sms_space_photo (
  space_photo_id INTEGER      NOT NULL COMMENT '공간 사진 번호', -- 공간 사진 번호
  space_id       INTEGER      NOT NULL COMMENT '공간 번호', -- 공간 번호
  photo          VARCHAR(255) NOT NULL COMMENT '사진' -- 사진
)
COMMENT '공간 사진';

-- 공간 사진
ALTER TABLE sms_space_photo
  ADD CONSTRAINT PK_sms_space_photo -- 공간 사진 기본키
    PRIMARY KEY (
      space_photo_id -- 공간 사진 번호
    );

ALTER TABLE sms_space_photo
  MODIFY COLUMN space_photo_id INTEGER NOT NULL AUTO_INCREMENT COMMENT '공간 사진 번호';

-- 스터디룸 예약
CREATE TABLE sms_space_room_bkng (
  space_bkng_id INTEGER  NOT NULL COMMENT '스터디룸예약번호', -- 스터디룸예약번호
  space_room_id INTEGER  NOT NULL COMMENT '스터디룸 번호', -- 스터디룸 번호
  space_id      INTEGER  NOT NULL COMMENT '공간 번호', -- 공간 번호
  std_id        INTEGER  NOT NULL COMMENT '스터디번호', -- 스터디번호
  member_id     INTEGER  NOT NULL COMMENT '회원번호', -- 회원번호
  bkng_sdt      DATETIME NOT NULL COMMENT '시작 일시', -- 시작 일시
  bkng_edt      DATETIME NOT NULL COMMENT '종료 일시' -- 종료 일시
)
COMMENT '스터디룸 예약';

-- 스터디룸 예약
ALTER TABLE sms_space_room_bkng
  ADD CONSTRAINT PK_sms_space_room_bkng -- 스터디룸 예약 기본키
    PRIMARY KEY (
      space_bkng_id -- 스터디룸예약번호
    );

ALTER TABLE sms_space_room_bkng
  MODIFY COLUMN space_bkng_id INTEGER NOT NULL AUTO_INCREMENT COMMENT '스터디룸예약번호';

-- 활동지역 대분류
CREATE TABLE sms_adr_l (
  adr_l_id CHAR(2)     NOT NULL COMMENT '주소 대분류 번호', -- 주소 대분류 번호
  name     VARCHAR(50) NOT NULL COMMENT '시도' -- 시도
)
COMMENT '활동지역 대분류';

-- 활동지역 대분류
ALTER TABLE sms_adr_l
  ADD CONSTRAINT PK_sms_adr_l -- 활동지역 대분류 기본키
    PRIMARY KEY (
      adr_l_id -- 주소 대분류 번호
    );

-- 활동지역 중분류
CREATE TABLE sms_adr_m (
  adr_m_id CHAR(2)     NOT NULL COMMENT '주소 중분류 번호', -- 주소 중분류 번호
  adr_l_id CHAR(2)     NOT NULL COMMENT '주소 대분류 번호', -- 주소 대분류 번호
  name     VARCHAR(50) NOT NULL COMMENT '시군구' -- 시군구
)
COMMENT '활동지역 중분류';

-- 활동지역 중분류
ALTER TABLE sms_adr_m
  ADD CONSTRAINT PK_sms_adr_m -- 활동지역 중분류 기본키
    PRIMARY KEY (
      adr_m_id, -- 주소 중분류 번호
      adr_l_id  -- 주소 대분류 번호
    );

-- 활동지역 소분류
CREATE TABLE sms_adr_s (
  adr_s_id CHAR(2)     NOT NULL COMMENT '주소 소분류 번호', -- 주소 소분류 번호
  adr_m_id CHAR(2)     NOT NULL COMMENT '주소 중분류 번호', -- 주소 중분류 번호
  adr_l_id CHAR(2)     NOT NULL COMMENT '주소 대분류 번호', -- 주소 대분류 번호
  name     VARCHAR(50) NULL     COMMENT '읍동면' -- 읍동면
)
COMMENT '활동지역 소분류';

-- 활동지역 소분류
ALTER TABLE sms_adr_s
  ADD CONSTRAINT PK_sms_adr_s -- 활동지역 소분류 기본키
    PRIMARY KEY (
      adr_s_id, -- 주소 소분류 번호
      adr_m_id, -- 주소 중분류 번호
      adr_l_id  -- 주소 대분류 번호
    );

-- 신청 스터디
CREATE TABLE sms_apl_std (
  member_id INTEGER      NOT NULL COMMENT '회원번호', -- 회원번호
  std_id    INTEGER      NOT NULL COMMENT '스터디번호', -- 스터디번호
  dtrm      VARCHAR(100) NOT NULL COMMENT '스터디 각오', -- 스터디 각오
  state     BOOLEAN      NOT NULL DEFAULT false COMMENT '열람여부', -- 열람여부
  apl_date  DATE         NOT NULL DEFAULT current_date() COMMENT '신청일' -- 신청일
)
COMMENT '신청 스터디';

-- 신청 스터디
ALTER TABLE sms_apl_std
  ADD CONSTRAINT PK_sms_apl_std -- 신청 스터디 기본키
    PRIMARY KEY (
      member_id, -- 회원번호
      std_id     -- 스터디번호
    );

-- 찜한 스터디
CREATE TABLE sms_pick_std (
  member_id INTEGER NOT NULL COMMENT '회원번호', -- 회원번호
  std_id    INTEGER NOT NULL COMMENT '스터디번호' -- 스터디번호
)
COMMENT '찜한 스터디';

-- 찜한 스터디
ALTER TABLE sms_pick_std
  ADD CONSTRAINT PK_sms_pick_std -- 찜한 스터디 기본키
    PRIMARY KEY (
      member_id, -- 회원번호
      std_id     -- 스터디번호
    );

-- 회원 자료실
CREATE TABLE sms_member_arch (
  member_arch_id INTEGER      NOT NULL COMMENT '회원자료실 번호', -- 회원자료실 번호
  member_id      INTEGER      NOT NULL COMMENT '회원번호', -- 회원번호
  file_path      VARCHAR(255) NOT NULL COMMENT '파일경로', -- 파일경로
  rgstr_dt       DATETIME     NOT NULL DEFAULT current_timestamp() COMMENT '등록일시' -- 등록일시
)
COMMENT '회원 자료실';

-- 회원 자료실
ALTER TABLE sms_member_arch
  ADD CONSTRAINT PK_sms_member_arch -- 회원 자료실 기본키
    PRIMARY KEY (
      member_arch_id -- 회원자료실 번호
    );

-- 회원 자료실 유니크 인덱스
CREATE UNIQUE INDEX UIX_sms_member_arch
  ON sms_member_arch ( -- 회원 자료실
    file_path ASC -- 파일경로
  );

ALTER TABLE sms_member_arch
  MODIFY COLUMN member_arch_id INTEGER NOT NULL AUTO_INCREMENT COMMENT '회원자료실 번호';

-- 회원 평점 정보
CREATE TABLE sms_member_rate_info (
  member_rate_info_id INTEGER NOT NULL COMMENT '회원평점 번호', -- 회원평점 번호
  std_id              INTEGER NOT NULL COMMENT '스터디번호', -- 스터디번호
  member_id           INTEGER NOT NULL COMMENT '회원번호', -- 회원번호
  confirm_member_id   INTEGER NOT NULL COMMENT '평가한 회원 번호', -- 평가한 회원 번호
  rate                DOUBLE  NOT NULL COMMENT '평점', -- 평점
  rate_dt             DATE    NOT NULL DEFAULT current_date() COMMENT '평가일' -- 평가일
)
COMMENT '회원 평점 정보';

-- 회원 평점 정보
ALTER TABLE sms_member_rate_info
  ADD CONSTRAINT PK_sms_member_rate_info -- 회원 평점 정보 기본키
    PRIMARY KEY (
      member_rate_info_id -- 회원평점 번호
    );

ALTER TABLE sms_member_rate_info
  MODIFY COLUMN member_rate_info_id INTEGER NOT NULL AUTO_INCREMENT COMMENT '회원평점 번호';

-- 게시판분류
CREATE TABLE sms_board_cls (
  cls_id   INTEGER     NOT NULL COMMENT '게시판분류번호', -- 게시판분류번호
  cls_name VARCHAR(50) NOT NULL COMMENT '분류명' -- 분류명
)
COMMENT '게시판분류';

-- 게시판분류
ALTER TABLE sms_board_cls
  ADD CONSTRAINT PK_sms_board_cls -- 게시판분류 기본키
    PRIMARY KEY (
      cls_id -- 게시판분류번호
    );

-- 게시판분류 유니크 인덱스
CREATE UNIQUE INDEX UIX_sms_board_cls
  ON sms_board_cls ( -- 게시판분류
    cls_name ASC -- 분류명
  );

ALTER TABLE sms_board_cls
  MODIFY COLUMN cls_id INTEGER NOT NULL AUTO_INCREMENT COMMENT '게시판분류번호';

-- 탈퇴추방완료분류
CREATE TABLE sms_end_state_cls (
  end_state_cls_id INTEGER     NOT NULL COMMENT '탈퇴추방완료분류번호', -- 탈퇴추방완료분류번호
  name             VARCHAR(50) NOT NULL COMMENT '이름' -- 이름
)
COMMENT '탈퇴추방완료분류';

-- 탈퇴추방완료분류
ALTER TABLE sms_end_state_cls
  ADD CONSTRAINT PK_sms_end_state_cls -- 탈퇴추방완료분류 기본키
    PRIMARY KEY (
      end_state_cls_id -- 탈퇴추방완료분류번호
    );

-- 탈퇴추방완료분류 유니크 인덱스
CREATE UNIQUE INDEX UIX_sms_end_state_cls
  ON sms_end_state_cls ( -- 탈퇴추방완료분류
    name ASC -- 이름
  );

ALTER TABLE sms_end_state_cls
  MODIFY COLUMN end_state_cls_id INTEGER NOT NULL AUTO_INCREMENT COMMENT '탈퇴추방완료분류번호';

-- 편의시설
CREATE TABLE sms_conv (
  conv_id INTEGER     NOT NULL COMMENT '편의시설번호', -- 편의시설번호
  name    VARCHAR(50) NOT NULL COMMENT '편의시설명' -- 편의시설명
)
COMMENT '편의시설';

-- 편의시설
ALTER TABLE sms_conv
  ADD CONSTRAINT PK_sms_conv -- 편의시설 기본키
    PRIMARY KEY (
      conv_id -- 편의시설번호
    );

ALTER TABLE sms_conv
  MODIFY COLUMN conv_id INTEGER NOT NULL AUTO_INCREMENT COMMENT '편의시설번호';

-- 공간휴일
CREATE TABLE sms_rest_day (
  space_id INTEGER NOT NULL COMMENT '공간 번호', -- 공간 번호
  rest_day DATE    NOT NULL COMMENT '휴일' -- 휴일
)
COMMENT '공간휴일';

-- 공간휴일
ALTER TABLE sms_rest_day
  ADD CONSTRAINT PK_sms_rest_day -- 공간휴일 기본키
    PRIMARY KEY (
      space_id, -- 공간 번호
      rest_day  -- 휴일
    );

-- 공간후기
CREATE TABLE sms_space_review (
  space_review_id INTEGER  NOT NULL COMMENT '공간후기번호', -- 공간후기번호
  member_id       INTEGER  NOT NULL COMMENT '회원번호', -- 회원번호
  space_id        INTEGER  NOT NULL COMMENT '공간 번호', -- 공간 번호
  rating          DOUBLE   NOT NULL COMMENT '별점', -- 별점
  review          TEXT     NOT NULL COMMENT '후기', -- 후기
  rgstr_dt        DATETIME NOT NULL DEFAULT current_timestamp() COMMENT '등록일시' -- 등록일시
)
COMMENT '공간후기';

-- 공간후기
ALTER TABLE sms_space_review
  ADD CONSTRAINT PK_sms_space_review -- 공간후기 기본키
    PRIMARY KEY (
      space_review_id -- 공간후기번호
    );

ALTER TABLE sms_space_review
  MODIFY COLUMN space_review_id INTEGER NOT NULL AUTO_INCREMENT COMMENT '공간후기번호';

-- 관심분야
CREATE TABLE sms_member_cls (
  member_id INTEGER NOT NULL COMMENT '회원번호', -- 회원번호
  cls_lms   CHAR(6) NOT NULL COMMENT '관심분야' -- 관심분야
)
COMMENT '관심분야';

-- 탈퇴 회원 정보
CREATE TABLE sms_member_retire (
  std_id       INTEGER NOT NULL COMMENT '스터디번호', -- 스터디번호
  member_id    INTEGER NOT NULL COMMENT '회원번호', -- 회원번호
  rate_require BOOLEAN NOT NULL DEFAULT true COMMENT '평가필요여부' -- 평가필요여부
)
COMMENT '탈퇴 회원 정보';

-- 탈퇴 회원 정보
ALTER TABLE sms_member_retire
  ADD CONSTRAINT PK_sms_member_retire -- 탈퇴 회원 정보 기본키
    PRIMARY KEY (
      std_id,    -- 스터디번호
      member_id  -- 회원번호
    );

-- 회원 평점 기록
CREATE TABLE sms_member_rate_log (
  rate_log_id INTEGER NOT NULL COMMENT '회원 평점 기록 번호', -- 회원 평점 기록 번호
  member_id   INTEGER NOT NULL COMMENT '회원번호', -- 회원번호
  rate        DOUBLE  NOT NULL COMMENT '평점', -- 평점
  update_dt   DATE    NOT NULL DEFAULT current_date() COMMENT '갱신일' -- 갱신일
)
COMMENT '회원 평점 기록';

-- 회원 평점 기록
ALTER TABLE sms_member_rate_log
  ADD CONSTRAINT PK_sms_member_rate_log -- 회원 평점 기록 기본키
    PRIMARY KEY (
      rate_log_id -- 회원 평점 기록 번호
    );

ALTER TABLE sms_member_rate_log
  MODIFY COLUMN rate_log_id INTEGER NOT NULL AUTO_INCREMENT COMMENT '회원 평점 기록 번호';

-- 스터디일정
ALTER TABLE sms_std_schdl
  ADD CONSTRAINT FK_sms_std_TO_sms_std_schdl -- 스터디 -> 스터디일정
    FOREIGN KEY (
      std_id -- 스터디번호
    )
    REFERENCES sms_std ( -- 스터디
      std_id -- 스터디번호
    );

-- 스터디일정
ALTER TABLE sms_std_schdl
  ADD CONSTRAINT FK_sms_std_member_TO_sms_std_schdl -- 스터디회원 -> 스터디일정
    FOREIGN KEY (
      std_id,    -- 스터디번호
      member_id  -- 회원번호
    )
    REFERENCES sms_std_member ( -- 스터디회원
      std_id,    -- 스터디번호
      member_id  -- 회원번호
    );

-- 스터디일정
ALTER TABLE sms_std_schdl
  ADD CONSTRAINT FK_sms_space_room_bkng_TO_sms_std_schdl -- 스터디룸 예약 -> 스터디일정
    FOREIGN KEY (
      space_bkng_id -- 스터디룸예약번호
    )
    REFERENCES sms_space_room_bkng ( -- 스터디룸 예약
      space_bkng_id -- 스터디룸예약번호
    );

-- 스터디자료실
ALTER TABLE sms_std_arch
  ADD CONSTRAINT FK_sms_std_member_TO_sms_std_arch -- 스터디회원 -> 스터디자료실
    FOREIGN KEY (
      std_id,    -- 스터디번호
      member_id  -- 회원번호
    )
    REFERENCES sms_std_member ( -- 스터디회원
      std_id,    -- 스터디번호
      member_id  -- 회원번호
    );

-- 쪽지
ALTER TABLE sms_msg
  ADD CONSTRAINT FK_sms_member_TO_sms_msg2 -- 회원 -> 쪽지
    FOREIGN KEY (
      send_id -- 보내는회원번호
    )
    REFERENCES sms_member ( -- 회원
      member_id -- 회원번호
    );

-- 쪽지
ALTER TABLE sms_msg
  ADD CONSTRAINT FK_sms_member_TO_sms_msg -- 회원 -> 쪽지2
    FOREIGN KEY (
      recv_id -- 받는회원번호
    )
    REFERENCES sms_member ( -- 회원
      member_id -- 회원번호
    );

-- 스터디 게시판
ALTER TABLE sms_std_board
  ADD CONSTRAINT FK_sms_std_member_TO_sms_std_board -- 스터디회원 -> 스터디 게시판
    FOREIGN KEY (
      std_id,    -- 스터디번호
      member_id  -- 회원번호
    )
    REFERENCES sms_std_member ( -- 스터디회원
      std_id,    -- 스터디번호
      member_id  -- 회원번호
    );

-- 스터디중분류
ALTER TABLE sms_std_cls_m
  ADD CONSTRAINT FK_sms_std_cls_l_TO_sms_std_cls_m -- 스터디대분류 -> 스터디중분류
    FOREIGN KEY (
      cls_l_id -- 대분류번호
    )
    REFERENCES sms_std_cls_l ( -- 스터디대분류
      cls_l_id -- 대분류번호
    );

-- 스터디소분류
ALTER TABLE sms_std_cls_s
  ADD CONSTRAINT FK_sms_std_cls_m_TO_sms_std_cls_s -- 스터디중분류 -> 스터디소분류
    FOREIGN KEY (
      cls_m_id, -- 중분류번호
      cls_l_id  -- 대분류번호
    )
    REFERENCES sms_std_cls_m ( -- 스터디중분류
      cls_m_id, -- 중분류번호
      cls_l_id  -- 대분류번호
    );

-- 스터디회원
ALTER TABLE sms_std_member
  ADD CONSTRAINT FK_sms_std_TO_sms_std_member -- 스터디 -> 스터디회원
    FOREIGN KEY (
      std_id -- 스터디번호
    )
    REFERENCES sms_std ( -- 스터디
      std_id -- 스터디번호
    );

-- 스터디회원
ALTER TABLE sms_std_member
  ADD CONSTRAINT FK_sms_member_TO_sms_std_member -- 회원 -> 스터디회원
    FOREIGN KEY (
      member_id -- 회원번호
    )
    REFERENCES sms_member ( -- 회원
      member_id -- 회원번호
    );

-- 스터디회원
ALTER TABLE sms_std_member
  ADD CONSTRAINT FK_sms_end_state_cls_TO_sms_std_member -- 탈퇴추방완료분류 -> 스터디회원
    FOREIGN KEY (
      end_state_cls_id -- 탙퇴추방완료분류번호
    )
    REFERENCES sms_end_state_cls ( -- 탈퇴추방완료분류
      end_state_cls_id -- 탈퇴추방완료분류번호
    );

-- 문의신고게시판
ALTER TABLE sms_rprt_inqry
  ADD CONSTRAINT FK_sms_member_TO_sms_rprt_inqry -- 회원 -> 문의신고게시판
    FOREIGN KEY (
      inqry_id -- 문의자번호
    )
    REFERENCES sms_member ( -- 회원
      member_id -- 회원번호
    );

-- 문의신고게시판
ALTER TABLE sms_rprt_inqry
  ADD CONSTRAINT FK_sms_member_TO_sms_rprt_inqry2 -- 회원 -> 문의신고게시판2
    FOREIGN KEY (
      sspct_id -- 피신고자번호
    )
    REFERENCES sms_member ( -- 회원
      member_id -- 회원번호
    );

-- 문의신고게시판
ALTER TABLE sms_rprt_inqry
  ADD CONSTRAINT FK_sms_board_cls_TO_sms_rprt_inqry -- 게시판분류 -> 문의신고게시판
    FOREIGN KEY (
      cls_id -- 게시판분류번호
    )
    REFERENCES sms_board_cls ( -- 게시판분류
      cls_id -- 게시판분류번호
    );

-- 스터디룸
ALTER TABLE sms_space_room
  ADD CONSTRAINT FK_sms_space_TO_sms_space_room -- 공간 -> 스터디룸
    FOREIGN KEY (
      space_id -- 공간 번호
    )
    REFERENCES sms_space ( -- 공간
      space_id -- 공간 번호
    );

-- 태그
ALTER TABLE sms_tag
  ADD CONSTRAINT FK_sms_space_TO_sms_tag -- 공간 -> 태그
    FOREIGN KEY (
      space_id -- 공간 번호
    )
    REFERENCES sms_space ( -- 공간
      space_id -- 공간 번호
    );

-- 스터디출석
ALTER TABLE sms_std_atnd
  ADD CONSTRAINT FK_sms_std_schdl_TO_sms_std_atnd -- 스터디일정 -> 스터디출석
    FOREIGN KEY (
      std_atnd_id -- 스터디일정번호
    )
    REFERENCES sms_std_schdl ( -- 스터디일정
      std_schdl_id -- 스터디일정번호
    );

-- 스터디출석
ALTER TABLE sms_std_atnd
  ADD CONSTRAINT FK_sms_std_member_TO_sms_std_atnd -- 스터디회원 -> 스터디출석
    FOREIGN KEY (
      std_id,    -- 스터디번호
      member_id  -- 회원번호
    )
    REFERENCES sms_std_member ( -- 스터디회원
      std_id,    -- 스터디번호
      member_id  -- 회원번호
    );

-- 공간편의시설
ALTER TABLE sms_space_conv_info
  ADD CONSTRAINT FK_sms_space_TO_sms_space_conv_info -- 공간 -> 공간편의시설
    FOREIGN KEY (
      space_id -- 공간 번호
    )
    REFERENCES sms_space ( -- 공간
      space_id -- 공간 번호
    );

-- 공간편의시설
ALTER TABLE sms_space_conv_info
  ADD CONSTRAINT FK_sms_conv_TO_sms_space_conv_info -- 편의시설 -> 공간편의시설
    FOREIGN KEY (
      conv_id -- 편의시설번호
    )
    REFERENCES sms_conv ( -- 편의시설
      conv_id -- 편의시설번호
    );

-- 공간 사진
ALTER TABLE sms_space_photo
  ADD CONSTRAINT FK_sms_space_TO_sms_space_photo -- 공간 -> 공간 사진
    FOREIGN KEY (
      space_id -- 공간 번호
    )
    REFERENCES sms_space ( -- 공간
      space_id -- 공간 번호
    );

-- 스터디룸 예약
ALTER TABLE sms_space_room_bkng
  ADD CONSTRAINT FK_sms_space_room_TO_sms_space_room_bkng -- 스터디룸 -> 스터디룸 예약
    FOREIGN KEY (
      space_room_id, -- 스터디룸 번호
      space_id       -- 공간 번호
    )
    REFERENCES sms_space_room ( -- 스터디룸
      space_room_id, -- 스터디룸 번호
      space_id       -- 공간 번호
    );

-- 스터디룸 예약
ALTER TABLE sms_space_room_bkng
  ADD CONSTRAINT FK_sms_std_member_TO_sms_space_room_bkng -- 스터디회원 -> 스터디룸 예약
    FOREIGN KEY (
      std_id,    -- 스터디번호
      member_id  -- 회원번호
    )
    REFERENCES sms_std_member ( -- 스터디회원
      std_id,    -- 스터디번호
      member_id  -- 회원번호
    );

-- 활동지역 중분류
ALTER TABLE sms_adr_m
  ADD CONSTRAINT FK_sms_adr_l_TO_sms_adr_m -- 활동지역 대분류 -> 활동지역 중분류
    FOREIGN KEY (
      adr_l_id -- 주소 대분류 번호
    )
    REFERENCES sms_adr_l ( -- 활동지역 대분류
      adr_l_id -- 주소 대분류 번호
    );

-- 활동지역 소분류
ALTER TABLE sms_adr_s
  ADD CONSTRAINT FK_sms_adr_m_TO_sms_adr_s -- 활동지역 중분류 -> 활동지역 소분류
    FOREIGN KEY (
      adr_m_id, -- 주소 중분류 번호
      adr_l_id  -- 주소 대분류 번호
    )
    REFERENCES sms_adr_m ( -- 활동지역 중분류
      adr_m_id, -- 주소 중분류 번호
      adr_l_id  -- 주소 대분류 번호
    );

-- 신청 스터디
ALTER TABLE sms_apl_std
  ADD CONSTRAINT FK_sms_member_TO_sms_apl_std -- 회원 -> 신청 스터디
    FOREIGN KEY (
      member_id -- 회원번호
    )
    REFERENCES sms_member ( -- 회원
      member_id -- 회원번호
    );

-- 신청 스터디
ALTER TABLE sms_apl_std
  ADD CONSTRAINT FK_sms_std_TO_sms_apl_std -- 스터디 -> 신청 스터디
    FOREIGN KEY (
      std_id -- 스터디번호
    )
    REFERENCES sms_std ( -- 스터디
      std_id -- 스터디번호
    );

-- 찜한 스터디
ALTER TABLE sms_pick_std
  ADD CONSTRAINT FK_sms_member_TO_sms_pick_std -- 회원 -> 찜한 스터디
    FOREIGN KEY (
      member_id -- 회원번호
    )
    REFERENCES sms_member ( -- 회원
      member_id -- 회원번호
    );

-- 찜한 스터디
ALTER TABLE sms_pick_std
  ADD CONSTRAINT FK_sms_std_TO_sms_pick_std -- 스터디 -> 찜한 스터디
    FOREIGN KEY (
      std_id -- 스터디번호
    )
    REFERENCES sms_std ( -- 스터디
      std_id -- 스터디번호
    );

-- 회원 자료실
ALTER TABLE sms_member_arch
  ADD CONSTRAINT FK_sms_member_TO_sms_member_arch -- 회원 -> 회원 자료실
    FOREIGN KEY (
      member_id -- 회원번호
    )
    REFERENCES sms_member ( -- 회원
      member_id -- 회원번호
    );

-- 회원 평점 정보
ALTER TABLE sms_member_rate_info
  ADD CONSTRAINT FK_sms_std_member_TO_sms_member_rate_info -- 스터디회원 -> 회원 평점 정보
    FOREIGN KEY (
      std_id,    -- 스터디번호
      member_id  -- 회원번호
    )
    REFERENCES sms_std_member ( -- 스터디회원
      std_id,    -- 스터디번호
      member_id  -- 회원번호
    );

-- 회원 평점 정보
ALTER TABLE sms_member_rate_info
  ADD CONSTRAINT FK_sms_member_TO_sms_member_rate_info -- 회원 -> 회원 평점 정보
    FOREIGN KEY (
      confirm_member_id -- 평가한 회원 번호
    )
    REFERENCES sms_member ( -- 회원
      member_id -- 회원번호
    );

-- 공간휴일
ALTER TABLE sms_rest_day
  ADD CONSTRAINT FK_sms_space_TO_sms_rest_day -- 공간 -> 공간휴일
    FOREIGN KEY (
      space_id -- 공간 번호
    )
    REFERENCES sms_space ( -- 공간
      space_id -- 공간 번호
    );

-- 공간후기
ALTER TABLE sms_space_review
  ADD CONSTRAINT FK_sms_space_TO_sms_space_review -- 공간 -> 공간후기
    FOREIGN KEY (
      space_id -- 공간 번호
    )
    REFERENCES sms_space ( -- 공간
      space_id -- 공간 번호
    );

-- 공간후기
ALTER TABLE sms_space_review
  ADD CONSTRAINT FK_sms_member_TO_sms_space_review -- 회원 -> 공간후기
    FOREIGN KEY (
      member_id -- 회원번호
    )
    REFERENCES sms_member ( -- 회원
      member_id -- 회원번호
    );

-- 관심분야
ALTER TABLE sms_member_cls
  ADD CONSTRAINT FK_sms_member_TO_sms_member_cls -- 회원 -> 관심분야
    FOREIGN KEY (
      member_id -- 회원번호
    )
    REFERENCES sms_member ( -- 회원
      member_id -- 회원번호
    );

-- 탈퇴 회원 정보
ALTER TABLE sms_member_retire
  ADD CONSTRAINT FK_sms_std_TO_sms_member_retire -- 스터디 -> 탈퇴 회원 정보
    FOREIGN KEY (
      std_id -- 스터디번호
    )
    REFERENCES sms_std ( -- 스터디
      std_id -- 스터디번호
    );

-- 탈퇴 회원 정보
ALTER TABLE sms_member_retire
  ADD CONSTRAINT FK_sms_std_member_TO_sms_member_retire -- 스터디회원 -> 탈퇴 회원 정보
    FOREIGN KEY (
      std_id,    -- 스터디번호
      member_id  -- 회원번호
    )
    REFERENCES sms_std_member ( -- 스터디회원
      std_id,    -- 스터디번호
      member_id  -- 회원번호
    );

-- 회원 평점 기록
ALTER TABLE sms_member_rate_log
  ADD CONSTRAINT FK_sms_member_TO_sms_member_rate_log -- 회원 -> 회원 평점 기록
    FOREIGN KEY (
      member_id -- 회원번호
    )
    REFERENCES sms_member ( -- 회원
      member_id -- 회원번호
    );