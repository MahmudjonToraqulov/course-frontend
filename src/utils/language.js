import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

export const en = {
    translation: {
        nav: [{label: "Home", url: "/"}, {label: "Forms", url: "/forms"}, {label: "my page", url: "/my-page"}, {label: "Admin", url: "/admin"}],
        adminDashboard: {
            header: 'Admin Dashboard',
            buttonTitle: 'Manage',
            items: [
                {
                    title: 'Manage Users',
                    url: '/admin/users',
                    description: 'View, block, or remove users. Promote or demote users from admin role.'
                },
                {
                    title: 'Manage Forms',
                    url: '/admin/manage-forms',
                    description: 'Edit or delete any user\'s forms, or add new questions to them.'
                },
                {
                    title: 'Manage users answers',
                    url: '/admin/manage-filled-forms',
                    description: 'Edit or delete any user\'s answers.'
                },
                {title: 'Manage Comments', url: '/admin/manage-comments', description: 'Delete any comment'}
            ]
        },
        home: "Home",
        loading: "loading...",
        logOut: 'Logout',
        loginRegistration: {
            login: {
                title: 'Login',
                loginBtn: 'Login',
                redirectToRegister: {
                    text: 'Don\'t have an account? ',
                    linkText: 'Register here'
                }
            },
            registration: {
                title: 'Register',
                registerBtn: 'Register',
                redirectToLogin: {
                    text: 'Already have an account? ',
                    linkText: 'Login here'
                },
                name: 'Name',
                namePlaceHolder: 'Enter your name',
            },
            email: 'Email',
            emailPlaceHolder: 'Enter you email',
            password: 'Password',
            passwordPlaceHolder: 'Enter you password',
        },
        usersPage: {
            title: 'Users',
            name: 'Name',
            email: "Email",
            role: "Role",
            status: "Status",
            admin: "Admin",
            user: "User",
            actions: "Actions",
            setAdminBtn: "Set admin",
            removeAdminBtn: "Remove admin",
            unblockUserBtn: "Unblock",
            blockUserBtn: "Block",
            deleteUserBtn: "Delete",
            viewUser: "View User",
            blocked: 'Blocked',
            unblocked: 'Active',
            me: "me"
        },
        addImage: 'Add image',
        update: "Update",
        remove: 'Remove',
        title: 'Title',
        description: "Description",
        topic: "Topic",
        tags: "Tags",
        image: 'Image',
        deleteImage: 'Delete image',
        minOneQuestion: 'At least on question is required',
        edit: "Edit",
        save: "Save",
        create: 'Create',
        delete: 'delete',
        formFields: 'Form fields',
        fieldName: "Field name",
        fieldType: 'Field type',
        text: 'Text',
        textarea: 'Textarea',
        select: 'Select',
        boolean: 'Boolean',
        hiddenQuestion: 'Hidden question',
        cancel: 'Cancel',
        saveChanges: 'Save changes',
        addField: 'Add Field',
        selectOptions: 'Select Options',
        saveOption: 'Edit option',
        addOption: 'Add Option',
        reset: 'reset',
        searchByTitle: 'Search by title',
        allTags: 'All Tags',
        allAuthors: 'All Authors',
        usersAnswers: 'Users answers',
        noFilledForms: 'No filled forms',
        myForms:'My Forms',
        noForms:'No form to show',
        filledBy:'Filled by',
        filledOn:'Filled on',
        author:'Author',
        createdOn: 'Created on',
        comments:'Comments',
        writeComment: 'Write a comment',
        noComments :'No comments',
        formTitle: 'Form title',
        formAuthor: 'Form author',
        pageNotFound: 'Oops! Page Not Found',
        pageNoExist: 'The page you are looking for does not exist.',
        backHome:'Go Back to Home',
        question: 'Question',
        questionType: 'Question type',
        answer: 'Answer',
        forms: 'Forms',
        createForm: 'Create form',
        chooseTemplate: 'Choose template to create',
        createNewForm: 'Create new form',
        questions: 'Questions',
        allComments:'All comments',
        manageForms: 'Manage forms',
        searchForms: 'Search forms',
        searchWord: 'search word',
        search:' Search',
        filledForms: 'Filled Forms',
        fillAllFields: 'Fill all fields',
        notValidEmail: 'Not valid email',
        undefined: 'undefined',
        fillForm: 'fillForm',
        enterName: 'Please enter a name',
        isInUse: 'is already in use',
        minTwoOptions: 'Please add at least two options',
        yes: 'yes',
        no: 'no',
        nameRequired: 'Name is required',
        emailRequired: 'Email is required',
        notValidPhone: 'Not valid phone',
        salesforceIntegration: 'Salesforce Integration',
        name: 'Name',
        email: 'Email',
        phone: 'Phone',
        jobTitle: 'Job title',
        priority: "priority",
        High: "High",
        Medium: "Medium",
        Low: "Low",
        Open: "Sent",
        "Work in progress": "Work in progress",
        Done:"Done",
        createInJira: "Create task in jira",
        jiraTasks: 'Jira Tasks',
        createTask: 'Create Task',
        newTaskJira: 'New Task',
        noJiraTasks: "No tasks yet."
    }
}

export const uz = {
    translation: {
        nav: [{label: "Asosiy", url: "/"}, {label: "Formalar", url: "/forms"}, {label: "Mening Sahifam", url: "/my-page"}, {label: "Admin", url: "/admin"}],
        adminDashboard: {
            header: 'Admin Paneli',
            buttonTitle: 'Boshqarish',
            items: [
                {
                    title: 'Foydalanuvchilarni boshqarish',
                    url: '/admin/users',
                    description: 'Foydalanuvchini ko\'rish, bloklash yoki o\'chirish. Foydalanuvchilarga admin bering yoki adminni olib tashlang'
                },
                {
                    title: 'Formalarni boshqarish',
                    url: '/admin/manage-forms',
                    description: 'Har qanday foydalanuvchi shakllarini tahrirlang yoki o\'chiring yoki ularga yangi savollar qo\'shing'
                },
                {
                    title: 'Foydalanuvchilar javobini boshqaring',
                    url: '/admin/manage-filled-forms',
                    description: 'Foydalanuvchi javobini o\'chirish yoki tahrirlang.'
                },
                {title: 'Kommentlarni boshqaring', url: '/admin/manage-comments', description: 'Har qanday foydalanuvchining javoblarini tahrirlang yoki o\'chiring'}
            ]
        },
        home: "Asosiy",
        loading: "Yuklanmoqda...",
        logOut: 'Chiqish',
        loginRegistration: {
            login: {
                title: 'Kirish',
                loginBtn: 'Kirish',
                redirectToRegister: {
                    text: 'Akkauntingiz yo\'qmi? ',
                    linkText: 'Registratsiyadan o\'ting'
                }
            },
            registration: {
                title: 'Registratsiya',
                registerBtn: 'Registratsiyadan o\'ting',
                redirectToLogin: {
                    text: 'Akkauntingiz bormi? ',
                    linkText: 'Kirish'
                },
                name: 'Ism',
                namePlaceHolder: 'Ismingizni kiriting',
            },
            email: 'Elektron pochta',
            emailPlaceHolder: 'Elektron pochtangizni kiriting',
            password: 'parol',
            passwordPlaceHolder: 'Parolingizni kiriting',
        },
        usersPage: {
            title: 'Foydalanuvchilar',
            name: 'Ism',
            email: "Elektron pochta",
            role: "Ro\'l",
            status: "Status",
            admin: "Administrator",
            user: "Foydalanuvchi",
            actions: "Harakatlar",
            setAdminBtn: "Admin qo\'shish",
            removeAdminBtn: "Adminni o\'chirish",
            unblockUserBtn: "Blokdan chiqarish",
            blockUserBtn: "Bloklash",
            deleteUserBtn: "O\'chirish",
            viewUser: "Foydalanuvchini ko\'rish",
            blocked: 'Bloklangan',
            unblocked: 'Aktiv',
            me: "Men"
        },
        addImage: 'Rasm qo\'shish',
        update: "Yangilash",
        remove: 'O\'chirish',
        title: 'Sarlavha',
        description: "Tavsif",
        topic: "Mavzu",
        tags: "Teglar",
        image: 'Rasm',
        deleteImage: 'Rasmni o\'chirish',
        minOneQuestion: 'Kamida 1 ta savol bo\'lishi shart',
        edit: "Tahrirlamoq",
        save: "Saqlamoq",
        create: 'Yaratmoq',
        delete: 'O\'chirmoq',
        formFields: 'Forma maydoni',
        fieldName: "Maydon nomi",
        fieldType: 'Maydon turi',
        text: 'Matn',
        textarea: 'Katta matn',
        select: 'Tanlash',
        boolean: 'Xa/yo\'q',
        hiddenQuestion: 'Yashirin savol',
        cancel: 'Bekor qilish',
        saveChanges: 'O\'zgarishlarni saqlash',
        addField: 'Maydon qo\'shish',
        selectOptions: 'Tanlov variantlari',
        saveOption: 'Tanlovni saqlash',
        addOption: 'Tanlov qo\'shish',
        reset: 'Dastlabki holiga qaytarish',
        searchByTitle: 'Satr orqali qidirish',
        allTags: 'Barcha teglar',
        allAuthors: 'Barcha mualliflar',
        usersAnswers: 'Foydalanuvchilar javoblari',
        noFilledForms: 'To\'ldirilgan maydon topilmadi',
        myForms:'Mening formalarim',
        noForms:'Formalar mavjud emas',
        filledBy:'Tomonidan to\'ldirilgan',
        filledOn:'To\'ldirilgan',
        author:'Muallif',
        createdOn: 'Yaratilgan',
        comments:'Kommentariyalar',
        writeComment: 'Komment yozish',
        noComments :'Kommentlar mavjud emas',
        formTitle: 'Forma sarlavhasi',
        formAuthor: 'Forma muallifi',
        pageNotFound: 'Sahifa topilmadi',
        pageNoExist: 'Sahifa mavjud emas',
        backHome:'Bosh sahifaga qaytish',
        question: 'Savol',
        questionType: 'Savol turi',
        answer: 'Javob',
        forms: 'Formalar',
        createForm: 'Forma yaratish',
        chooseTemplate: 'Shablon tanlash',
        createNewForm: 'Yangi forma yaratish',
        questions: 'Savollar',
        allComments:'Barcha kommentariyalar',
        manageForms: 'Formalarni boshqarish',
        searchForms: 'Forma qidirish',
        searchWord: 'So\'z qidirish',
        search:' Qidirish',
        filledForms: 'Forma to\'ldirish',
        fillAllFields: 'Barcha maydonlarni to\'ldirish',
        notValidEmail: 'Yaroqsiz email',
        undefined: 'Topilmadi',
        fillForm: 'Forma to\'ldirish',
        enterName: 'Iltimos, ismingizni kiriting',
        isInUse: 'Allaqachon ishlatilmoqda',
        minTwoOptions: 'Iltimos kamida 2 ta javob kiriting',
        yes: 'xa',
        no: 'yo\'q',
        nameRequired: 'Ism yozilishi shart!',
        emailRequired: 'Email yozilishi shart!',
        notValidPhone: 'Telefon raqam noto\'g\'ri kiritildi',
        salesforceIntegration: 'Salesforce integratsiyasi',
        name: 'Ism',
        email: 'Email',
        phone: 'Telefon',
        jobTitle: 'Lavozim',
        priority: "Ustuvorligi",
        High: "Baland",
        Medium: "O\'rta",
        Low: "Past",
        Open: "Jo'natildi",
        "Work in progress": "Jarayonda...",
        Done:"Bajarildi",
        createInJira: "Jirada topshiriq yarating",
        jiraTasks: 'Jira topshiriqlari',
        createTask: 'Topshiriq yarating',
        newTaskJira: 'Yangi topshiriq',
        noJiraTasks: "Topshiriqlar mavjud emas."
    }
}




i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: en,
            uz: uz
        }, lng: "en",
        fallbackLng: "en", interpolation: {
            escapeValue: false
        }
    });

export default i18n;