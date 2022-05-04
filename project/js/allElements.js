// 登录界面点击切换 tab栏
var usernameLogin = document.querySelector('.login_personMessage');
var emailLogin = document.querySelector('.login_personMessageEmail');


// 登录
var login_background = document.querySelector('.login_background');
var login_close = document.querySelectorAll('.login_close');
var login_returnRegister = document.querySelector('.login_returnRegister_a');
var login_personMessage_password_close = document.querySelector('.login_personMessage_password_close');
var login_personMessage_password_close1 = document.querySelector('.login_personMessage_password_close1');
var login_personMessage_password = document.querySelector('.login_personMessage_password');
var login_personMessage_password1 = document.querySelector('.login_personMessage_password1');
var login_personMessage_username = document.querySelector('.login_personMessage_username');
var login_personMessage_email = document.querySelector('.login_personMessage_email');
var login_personMessageButton = document.querySelector('.login_personMessageButton');
var login_personMessageButton1 = document.querySelector('.login_personMessageButton1');
var freeLogin_button = document.querySelector('.freeLogin_button');


// 注册
var register = document.querySelector('.register');
var register_background = document.querySelector('.register_background');
var register_returnLogin = document.querySelector('.register_returnLogin_a');
var register_personMessage_password_close = document.querySelector('.register_personMessage_password_close');
var register_personMessage_password_close1 = document.querySelector('.register_personMessage_password_close1');
var register_personMessage_password = document.querySelector('.register_personMessage_password');
var register_personMessage_password1 = document.querySelector('.register_personMessage_password1');
var register_personMessage_username = document.querySelector('.register_personMessage_username');
var register_personMessage_email = document.querySelector('.register_personMessage_email');
var register_personMessageButton = document.querySelector('.register_personMessageButton');


// 正则提示
var registerPasswordTips = document.querySelector('.register_passwordTips');
var registerUsernameTips = document.querySelector('.register_usernameTips');
var registerEmailTips = document.querySelector('.register_emailTips');
var registerPasswordTips1 = document.querySelector('.register_passwordTips1');
var loginPasswordTips = document.querySelector('.login_passwordTips');
var loginPasswordTips1 = document.querySelector('.login_passwordTips1');


// 七天免登陆
var freeLogin_button = document.querySelector('.freeLogin_button');


// 修改密码
var changePassword_oldPasswordBox = document.querySelector('.changePassword_oldPasswordBox');
var changePassword_emailCode = document.querySelector('.changePassword_emailCode');
var changePassword_returnLogin = document.querySelector('.changePassword_returnLogin');
var changePassword_returnLogin1 = document.querySelector('.changePassword_returnLogin1');
var login_personMessage_password_forget = document.querySelector('.login_personMessage_password_forget');
var login_personMessage_password_forget1 = document.querySelector('.login_personMessage_password_forget1');
var changePassword_button = document.querySelector('.changePassword_button');
var changePassword_button1 = document.querySelector('.changePassword_button1');
var changePassword_oldPassword = document.querySelector('.changePassword_oldPassword');
var changePassword_username = document.querySelector('.changePassword_username');
var changePassword_newPassword = document.querySelector('.changePassword_newPassword');
var changePassword_email = document.querySelector('.changePassword_email');
var changePassword_code = document.querySelector('.changePassword_code');
var changePassword_getCode = document.querySelector('.changePassword_getCode');
var changePassword_newPassword1 = document.querySelector('.changePassword_newPassword1');


// forum动态(包含顶部导航栏)
var forum = document.querySelector('.forum');
var topBar_username = document.querySelector(".topBar_username");
var topBar_allTalking = document.querySelector('.topBar_allTalking');
var topBar_hotTalking = document.querySelector('.topBar_hotTalking');
var topBar_createTalking = document.querySelector('.topBar_createTalking');
var topBar_deleteTalking = document.querySelector('.topBar_deleteTalking');
var userHeadImg = document.getElementById('userHeadImg');
var topBar_userInfo = document.querySelector('.topBar_userInfo');
var topBar_userHeadImg = document.querySelector('.topBar_userHeadImg');
var topBar_submenu = document.querySelector('.topBar_submenu');
var submenu_username = document.querySelector('.submenu_username');
var submenu_logOut = document.querySelector('.submenu_logOut');
var forum_container = document.querySelector('.forum_container');
var submenu_username = document.querySelector('.submenu_username');
var forum_content = document.querySelector('.forum_content');
var likeImg = document.querySelector('likeImg');
var topBar_search = document.querySelector('.topBar_search');
var topBar_searchImg = document.querySelector('.topBar_searchImg');
var forum_usernameAndHeadImg = document.querySelector('.forum_usernameAndHeadImg');


// 个人信息
var PersonalMessage_Id = document.querySelector('.PersonalMessage_Id');
var PersonalMessage_username = document.querySelector('.PersonalMessage_username');
var PersonalMessage_sex = document.querySelector('.PersonalMessage_sex');
var PersonalMessage_age = document.querySelector('.PersonalMessage_age');
var PersonalMessage_phone = document.querySelector('.PersonalMessage_phone');
var PersonalMessage_email = document.querySelector('.PersonalMessage_email');
var headImg_box = document.querySelector('.headImg_box');
var personalHomePage = document.querySelector('.personalHomePage');
var headImg_button = document.querySelector('.headImg_button');
var headImg = document.querySelector('.headImg');


// 修改个人信息
var changeMessage_background = document.querySelector('.changeMessage_background');
var changePeasonalMessage_button = document.querySelector('.changePeasonalMessage_button');
var changeuserPersonalMessage_box = document.querySelector('.changeuserPersonalMessage_box');
var personalMessage = document.querySelector('.personalMessage');
var changeuser_returnHomepage = document.querySelector('.changeuser_returnHomepage');
var changeUserId = document.querySelector('.changeUser_id');
var changeUserName = document.querySelector('.changeUser_username');
var changeUserEmail = document.querySelector('.changeUser_email');
var changeUserPhone = document.querySelector('.changeUser_phone');
var changeUserSex = document.querySelector('.changeUser_sex');
var changeUserAge = document.querySelector('.changeUser_age');
var changeUserButton = document.querySelector('.changeUserButton');


// 删除账号部分
var deleteBox_background = document.querySelector('.deleteBox_background');
var deleteBox = document.querySelector('.deleteBox');
var deleteUser = document.querySelector('.delete_userButton');
var delete_username = document.querySelector('.delete_username');
var delete_email = document.querySelector('.delete_email');
var delete_password = document.querySelector('.delete_password');
var deleteButton = document.querySelector('.delete_button');
var deleteReturnHomepage = document.querySelector('.delete_returnHomepage');


// 新增动态
var createTalking_title = document.querySelector('.createTalking_title');
var createTalking_content = document.querySelector('.createTalking_content');
var createTalking_button = document.querySelector('.createTalking_button');
var createTalking_img = document.querySelector('.createTalking_img');
var createTalking_imgButton = document.querySelector('.createTalking_imgButton');
var TalkingImg_box = document.querySelector('.TalkingImg_box');


// 删除动态
var deleteTalking = document.querySelector('.deleteTalking');

// 相册
var submenu_photoAlbum = document.querySelector('.submenu_photoAlbum');
var photoAlbum_createButton = document.querySelector('.photoAlbum_createButton');
var photoAlbum_box = document.querySelector('.photoAlbum_box');
var photoAlbum_wrap = document.querySelector('.photoAlbum_wrap');
var photoAlbum_createBox = document.querySelector('.photoAlbum_createBox');
var photoAlbum_button = document.querySelector('.photoAlbum_button');
var photoAlbum_introduction = document.querySelector('.photoAlbum_introduction');
var photoAlbum_name = document.querySelector('.photoAlbum_name');
var returnPhotoAlbum = document.querySelector('.returnPhotoAlbum');
var photo_box = document.querySelector('.photo_box');
var photo_createButton = document.querySelector('.photo_createButton');
var photo = document.querySelector('.photo');
var deletePhotoAlbum = document.querySelector('.deletePhotoAlbum');
var photo_wrap = document.querySelector('.photo_wrap');
var photo_button = document.querySelector('.photo_button');
var inputPhotoBox = document.querySelector('.inputPhotoBox');
var inputPhoto = document.querySelector('.inputPhoto');
var photo_createBox = document.querySelector('.photo_createBox');
var photo_Title = document.querySelector('.photo_Title');
var photoReturnPhotoAlbum = document.querySelector('.photoReturnPhotoAlbum');
var photo_returnButton = document.querySelector('.photo_returnButton');

// 详情部分
var forum_Viewmore = document.querySelector('.forum_Viewmore');
var inputComment = document.querySelector('.inputComment');
var comment_submit = document.querySelector('.comment_submit');
var comment_box = document.querySelector('.comment_box');
var comment_wrap = document.querySelector('.comment_wrap');