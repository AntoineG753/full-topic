// USERS 

export const sqlCheckEmail = (email) => {
    return `SELECT COUNT(*) AS present FROM user WHERE email = '${email}'`
};

export const sqlCheckPseudo = (pseudo) => {
    return `SELECT COUNT(*) AS present FROM user WHERE pseudo = '${pseudo}'`
};

export const sqlSignup = (uuid, email, pseudo, password, img ) => {
    return `INSERT INTO user  (uuid, email, pseudo, password, avatar) VALUES ( "${uuid}", "${email}", "${pseudo}", "${password}", "${img}")` 
};

export const sqlLogin = (pseudo) => {
    return `SELECT * FROM user WHERE pseudo = '${pseudo}'`
};

export const sqlUpdateAccount = (pseudo, name, last_name, email, password, date_of_birth, uuid) => {
    return `UPDATE user SET pseudo = '${pseudo}', name = '${name}', lastname = '${last_name}', email = '${email}', password = '${password}', date_of_birth = '${date_of_birth}' WHERE uuid = '${uuid}'`
};

export const sqlAdminUpdateAccount = (pseudo, name, last_name, email, avatar, date_of_birth, role, uuid) => {
    return `UPDATE user SET pseudo = '${pseudo}', name = '${name}', lastname = '${last_name}', email = '${email}', avatar = '${avatar}', date_of_birth = '${date_of_birth}', role = '${role}' WHERE uuid = '${uuid}'`
};

export const sqlUpdateImgAccount = (avatar, uuid) => {
    return `UPDATE user SET avatar = '${avatar}' WHERE uuid = '${uuid}'`
};

// export const sqlConnected = (uuid) => {
//     return `INSERT user_connected (uuid) VALUES ("${uuid}")`
// };

// export const sqlRemoveConnected = (uuid) => {
//     return `DELETE FROM user_connected WHERE uuid= "${uuid}"`
// };

// export const sqlRemoveDisConnected = (uuid) => {
//     return `DELETE FROM user_disconnected WHERE uuid= "${uuid}"`
// };

// export const sqlDisConnected = (uuid) => {
//     return `INSERT user_disconnected (uuid) VALUES ("${uuid}")`
// };

export const sqlDeleteAccount = (uuid) => {
    return `DELETE FROM user WHERE uuid = "${uuid}"`
};

export const sqlallAccount = () => {
    return `SELECT * FROM user ORDER BY pseudo`
}

export const sqlGetAccount = (uuid) => {
    return `SELECT * FROM user WHERE uuid = '${uuid}'`
}

export const sqlGetSearchAccount = (pseudo) => {
    return `Select * FROM user WHERE pseudo LIKE '%${pseudo}%'`
};

export const sqlAuthUuid = (uuid) => {
    return `SELECT uuid FROM user WHERE uuid = "${uuid}"`
};


//Category ----------------------------------------------------------------
export const sqlCreateCategroy = (name, desc, picture) => {
    return `INSERT category (name_category, description_category, image_category) VALUES ("${name}","${desc}" ,"${picture}")`
};

export const sqlUpdateCategroy = (name, desc, picture, id) => {
    return `UPDATE category SET name_category = '${name}', description_category = '${desc}', image_category = '${picture}' WHERE id_category = '${id}'`
};


export const sqlDeleteCategory = (id_category) => {
    return `DELETE FROM category WHERE id_category = '${id_category}'`;
};

export const sqlGetAllCategory = () => {
    return `SELECT * FROM category`
};

export const sqlGetCategory = (id) => {
    return `SELECT * FROM category WHERE id_category = '${id}'`;
};

export const sqlGetSearchCategory = (name) => {
    return `Select * FROM category WHERE name_category LIKE '%${name}%'`
};

export const sqlGetCategorySubCategory = (id) => {
    return `SELECT id_category FROM category WHERE name_category = '${id}'`
};

export const test = (id) => {
    return `SELECT * FROM sub_category WHERE id_category = '${id}'`
};


export const sqlGetAllSubCategory = (id) => {
    return `select *, (SELECT COUNT(*) FROM messages where id_sub_category = sub_category.id_sub_category) as numberComment, (SELECT number_like FROM likes where id_sub_category = sub_category.id_sub_category) as number_like from sub_category left join user on user.uuid = sub_category.id_user where sub_category.id_category = ${id} ORDER BY creation_date DESC`
};

export const sqlAdminGetAllSubCategory = () => {
    return `select *, (SELECT COUNT(*) FROM messages where id_sub_category = sub_category.id_sub_category) as numberComment, (SELECT COUNT(*) FROM likes where id_sub_category = sub_category.id_sub_category) as numberLike from sub_category left join user on user.uuid = sub_category.id_user ORDER BY creation_date DESC`
};

export const sqlGetSubCategory = (id) => {
    return `select * from sub_category left join user on user.uuid = sub_category.id_user WHERE id_sub_category = '${id}'`
};

export const sqlCreateSubCategory = (id_category, description, titre, uuid, img) => {
    return `INSERT sub_category (id_category, description_sub_category, name_sub_category, id_user, image_sub_category) VALUES ("${id_category}","${description}", "${titre}", "${uuid}", "${img}")`
};

export const sqlDeleteSubCategory = (id) => {
    return `DELETE FROM sub_category WHERE id_sub_category = '${id}'`;
};

export const sqlCreateSubCategoryImg = (id_category, description, titre, uuid, img) => {
    return `INSERT sub_category (id_category, description_sub_category, name_sub_category, id_user, image_sub_category) VALUES ("${id_category}","${description}", "${titre}", "${uuid}", "${img}")`
};

export const sqlUpdateSubCategoryImg = (titre, description, img, id) => {
    return `UPDATE sub_category SET name_sub_category = '${titre}', description_sub_category = '${description}', image_sub_category = '${img}' WHERE id_category = '${id}'`
};

export const sqlAdminUpdateSubCategoryImg = (titre, description, img, id_category, id) => {
    return `UPDATE sub_category SET name_sub_category = '${titre}', description_sub_category = '${description}', image_sub_category = '${img}',  id_category = '${id_category}' WHERE id_sub_category = '${id}'`
};

export const sqlGetSearchSubCategory = (name) => {
    return `Select *, (SELECT COUNT(*) FROM messages where id_sub_category = sub_category.id_sub_category) as numberComment, (SELECT COUNT(*) FROM likes where id_sub_category = sub_category.id_sub_category) as numberLike FROM sub_category left join user on user.uuid = sub_category.id_user WHERE name_sub_category LIKE '%${name}%' ORDER BY creation_date DESC`
};

export const sqlReportSubCategory = (id_sub_category, id) => {
    return `INSERT report_sub_category  (id_sub_category, uuid_userSubCategory, pseudo_userReport, allPseudoReport) VALUES ("${id_sub_category}", (SELECT id_user FROM sub_category WHERE id_sub_category = "${id_sub_category}"), "${id}", "${id}")`
};

export const sqlGetReportSubCategory = (id) => {
    return `Select * FROM report_sub_category WHERE id_sub_category = '${id}'`
};

export const sqlGetAllReportSubCategory = () => {
    return `Select * FROM report_sub_category left join user on user.uuid = report_sub_category.uuid_userSubCategory left join sub_category on sub_category.id_sub_category = report_sub_category.id_sub_category ORDER BY report_date ASC`
};

export const sqlUpdateReportSubCategory = (number, id, allPseudo) => {
    return `UPDATE report_sub_category SET number_report = '${number}', allPseudoReport = '${allPseudo}' WHERE id_sub_category = '${id}'`
};

export const sqlApprouvedReportSubCategory = (id) => {
    return `DELETE FROM report_sub_category WHERE id_report = ${id}`
};


// MESSAGE ----------------------------------------------------------------------
export const sqlGetAllMessage = (id_sub_category) => {
    return `SELECT * FROM messages left join user on user.uuid = messages.uuid WHERE id_sub_category = ${id_sub_category} ORDER BY create_message ASC`
};
export const sqlGetMessage = (id) => {
    return `SELECT * FROM messages WHERE id_message = ${id}`
};
export const sqlCreateMessage = (uuid, id_category, message, img) => {
    return `INSERT messages (id_sub_category, uuid, message, image_message) VALUES ("${id_category}","${uuid}", "${message}", "${img}")`
};
export const sqlDeleteMessage = (id) => {
    return `DELETE FROM messages WHERE id_message = ${id}`
};
export const sqlGetNumberComment = (id) => {
    return `Select COUNT(*) FROM messages WHERE id_sub_category = '${id}'`
};

export const sqlReportMessage = (id_message, id) => {
    return `INSERT report_message  (id_message, uuid_userMessage, pseudo_userReport, allPseudoReport) VALUES ("${id_message}", (SELECT uuid FROM messages WHERE id_message = "${id_message}"), "${id}", "${id}")`
};

export const sqlGetReportMessage = (id) => {
    return `Select * FROM report_message WHERE id_message = '${id}'`
};

export const sqlGetAllReportMessage = () => {
    return `Select * FROM report_message left join user on user.uuid = report_message.uuid_userMessage left join messages on messages.id_message = report_message.id_message ORDER BY report_date ASC`
};

export const sqlUpdateReportMessage = (number, id, allPseudo) => {
    return `UPDATE report_message SET number_report = '${number}', allPseudoReport = '${allPseudo}' WHERE id_message = '${id}'`
};

export const sqlApprouvedReportMessage = (id) => {
    return `DELETE FROM report_message WHERE id_report = ${id}`
};

// LIKE ------------------------

export const sqlGetLikeSubCategory = (id) => {
    return `select * from likes WHERE id_sub_category = '${id}'`
};

export const sqlCreateLikeSubCategory = (id_sub_category, pseudo) => {
    return `INSERT likes (id_sub_category, pseudo_like) VALUE ("${id_sub_category}", "${pseudo}")`
};

export const sqlDisLikeSubCategory = (pseudo, numberLike, id) => {
    return `UPDATE likes SET pseudo_like = '${pseudo}', number_like = '${numberLike}' WHERE id_sub_category = '${id}'`
};

export const sqlLikeSubCategory = (pseudo, numberLike, id) => {
    return `UPDATE likes SET pseudo_like = '${pseudo}', number_like = '${numberLike}' WHERE id_sub_category = '${id}'`
};