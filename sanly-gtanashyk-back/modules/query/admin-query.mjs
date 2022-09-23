import { FACULTY_ID } from "../constant/constant.mjs";

export const addAllStudents = `
INSERT INTO public.talyplar(
	talyp_belgi, ady, familyasy, a_ady, doglan_sene, ata_ady_familyasy, ata_tel, ene_ady_familyasy, ene_tel, talyp_tel, welayat_id, fakultet_id, hunar_id, topar_id, kurs, jynsy)
	VALUES %L RETURNING *;
`;

export const truncate_studets = `TRUNCATE TABLE talyplar RESTART IDENTITY`;

export const loginQuery = `
SELECT u.*
FROM users u 
WHERE u.username=$1 AND u.password=$2;
`;

export const updateToken = "UPDATE users SET token=$1 WHERE id=$2 RETURNING *";

export const getAllStudenstQuery = `
	SELECT t.*,h.ady as hunari,f.ady as fakultety,top.ady as topary,w.ady as welayaty,
	(SELECT array_to_json(array_agg(l.*)) FROM log l WHERE l.student_number=CAST(coalesce(t.talyp_belgi, '0') AS integer)) as logs
	FROM public.talyplar t 
	LEFT JOIN fakultetler f ON f.id=t.fakultet_id
	LEFT JOIN hunarler h ON h.id=t.hunar_id
	LEFT JOIN toparlar top ON top.id=t.topar_id
	LEFT JOIN welayatlar w ON w.id=t.welayat_id
	WHERE t.fakultet_id=${FACULTY_ID}
	ORDER BY t.id DESC;
`;


export const getLogs = `
	SELECT l.*,t.ady,t.a_ady,t.familyasy,t.kurs,t.talyp_tel,t.ene_tel,t.ata_tel,t.ata_ady_familyasy,t.ene_ady_familyasy,t.talyp_belgi,
	top.ady as topary,h.ady as hunari,w.ady as welayaty,u.fullname as username
	FROM public.log l 
	LEFT JOIN talyplar t ON l.student_number=CAST(coalesce(t.talyp_belgi, '0') AS integer)
	LEFT JOIN toparlar top ON top.id=t.topar_id
	LEFT JOIN hunarler h ON h.id=t.hunar_id
	LEFT JOIN welayatlar w ON w.id=t.welayat_id
	LEFT JOIN users u ON u.id=l.user_id
	%s
	ORDER BY l.created_at DESC;
`;

export const updateMotherSms = `
UPDATE public.log
	SET sms_status=$1
	WHERE id=$2;
`;

export const updateFatherSms = `
UPDATE public.log
	SET second_sms_status=$1
	WHERE id=$2;
`;

export const getSmsQuery = `
SELECT id, sms, type, created_at, updated_at
	FROM public.sms_template;
`;

export const updateSmsQuery = `
UPDATE public.sms_template
	SET sms=$1, updated_at=now()
	WHERE type=$2 RETURNING *;
`;

export const getFaculty = `
SELECT id, ady, dekan
	FROM public.fakultetler;
`;

export const getCourse = `
SELECT id, ady, fakultet_id
	FROM public.hunarler WHERE fakultet_id=${FACULTY_ID};
`;

export const getGroup = `
SELECT id, ady, hunar_id, fakultet_id
	FROM public.toparlar  WHERE fakultet_id=${FACULTY_ID} ORDER BY ady;
`;

export const getRegion = `
SELECT id, ady
	FROM public.welayatlar;
`;

export const addLogsQuery = `
INSERT INTO public.log(
	reason, reason_type, log_type, sms_status, created_at, updated_at, status, reject_reason, student_number, user_id, second_sms_status, log_date, log_time)
	VALUES %L RETURNING *;
`;

export const getAllReasons = `
	SELECT id, reason, type, created_at, updated_at
	FROM reasons ORDER BY created_at DESC;
`;

export const addReasonQuery = `
INSERT INTO public.reasons(
	reason, type, created_at, updated_at)
	VALUES ($1, $2, now(), now()) RETURNING *;
`;