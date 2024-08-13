/**
 * @description       : 
 * @author            : soomjeet.sahoo
 * @group             : $groupname
 * @last modified on  : 10-08-2023
 * @last modified by  : soomjeet.sahoo
**/
public with sharing class PortfolioProfileController {

    /* Experience part */
    private static final string EDUCATIONAL_INSTITUTION_RECORDTYPE_DEVELOPERNAME = 'Educational_Institutions';
    private static final string EMPLOYERS_RECORDTYPE_DEVELOPERNAME = 'Employers';
    private static final string PP_EXPERIENCE_FIELD_SET_NAME = 'pp_Experience_Field_Set';
    private static final string EXPERIENCE_OBJ_API_NAME = Experience__c.sObjectType.getDescribe().getName();
    private static final List<Id> EXPERIENCE_OBJ_RT_IDS = new List<Id>{ 
        Schema.SObjectType.Experience__c.getRecordTypeInfosByDeveloperName().get(EDUCATIONAL_INSTITUTION_RECORDTYPE_DEVELOPERNAME).getRecordTypeId(),
        Schema.SObjectType.Experience__c.getRecordTypeInfosByDeveloperName().get(EMPLOYERS_RECORDTYPE_DEVELOPERNAME).getRecordTypeId()
    };
    private static final boolean TRUE_BOOLEAN_VALUE = true;

    /* Certification part */
    private static final String PP_CERTIFICATIONS_FIELD_SET_NAME = 'pp_Certifications_Field_Set';
    private static final string CERTIFICATIONS_OBJ_API_NAME = Certification__c.sObjectType.getDescribe().getName();


    /* Skill part */
    private static final String PP_SKILLS_FIELD_SET_NAME = 'pp_Skills_Field_Set';
    private static final string SKILLS_OBJ_API_NAME = Skill__c.sObjectType.getDescribe().getName();

    @AuraEnabled(cacheable=true)
    public static PortfolioWrapper getPortfolioData() {
        PortfolioWrapper pWrapRec = new PortfolioWrapper();
        try {
            pWrapRec.experiences = getExperiences();
            pWrapRec.certifications = getCertifications();
            pWrapRec.skills = getSkills();
        } catch (Exception exp) {
            System.debug(exp.getStackTraceString());
            throw new AuraHandledException(exp.getMessage());
        }
        return pWrapRec;
    }

    
    public static List<ExperienceComponentWrapper> getExperiences(){
        List<ExperienceComponentWrapper> expWrapperList = new List<ExperienceComponentWrapper>(); 
        String accountGetQuery = 'SELECT '+PortfolioProfileControllerUtil.getAllFieldsFromFS(PP_EXPERIENCE_FIELD_SET_NAME, EXPERIENCE_OBJ_API_NAME)+' FROM '+EXPERIENCE_OBJ_API_NAME+' WHERE RecordTypeId IN: EXPERIENCE_OBJ_RT_IDS AND isActive__c =: TRUE_BOOLEAN_VALUE ORDER BY Display_Order__c';
        System.debug('accountGetQuery >> '+accountGetQuery);
        for (Experience__c exp : Database.query(String.escapeSingleQuotes(accountGetQuery), AccessLevel.USER_MODE)) {
            ExperienceComponentWrapper ecWrapRec = new ExperienceComponentWrapper();
            ecWrapRec.id = exp?.id;
            ecWrapRec.name = exp?.Name;
            ecWrapRec.recordTypeName = exp?.RecordType?.DeveloperName;
            ecWrapRec.roleName = exp?.Role__c;
            ecWrapRec.priorityOrder = Integer.valueOf(exp?.Display_Order__c);
            ecWrapRec.startDate = exp?.Start_Date__c;
            ecWrapRec.iconName = exp?.Icon_Name__c;
            ecWrapRec.workDescription = exp?.Role_Description__c;
            // ecWrapRec.endDate = exp?.End_Date__c!=null ? exp?.End_Date__c : Date.today();
            ecWrapRec.endDate = exp?.End_Date__c;
            ecWrapRec.isCurrentOrg = exp?.isCurrentOrg__c;
            expWrapperList.add(ecWrapRec);
        }
        return expWrapperList;
    }

    private static List<CertificationsWrapper> getCertifications() {
        List<CertificationsWrapper> certWrapperList = new List<CertificationsWrapper>();
        String certificationsGetQuery = 'SELECT '+PortfolioProfileControllerUtil.getAllFieldsFromFS(PP_CERTIFICATIONS_FIELD_SET_NAME, CERTIFICATIONS_OBJ_API_NAME)+' FROM '+CERTIFICATIONS_OBJ_API_NAME+' WHERE isActive__c =: TRUE_BOOLEAN_VALUE ORDER BY Order_Number__c';
        System.debug('certificationsGetQuery >> '+certificationsGetQuery);
        for(Certification__c cert : Database.query(String.escapeSingleQuotes(certificationsGetQuery), AccessLevel.USER_MODE)){
            CertificationsWrapper certWrap = new CertificationsWrapper();
            certWrap.id = cert.Id;
            certWrap.name = cert.Name;
            certWrap.iconName = cert.Icon_Name__c;
            certWrap.desktopDisplaySize = cert.Name.length() >= 35 ? 12 : 6;
            certWrapperList.add(certWrap);
        }
        return certWrapperList;
    }


    private static List<SkillWrapper> getSkills() {
        List<SkillWrapper> skillWrapperList = new List<SkillWrapper>();
        String skillsGetQuery = 'SELECT '+PortfolioProfileControllerUtil.getAllFieldsFromFS(PP_SKILLS_FIELD_SET_NAME, SKILLS_OBJ_API_NAME)+' FROM '+SKILLS_OBJ_API_NAME+' WHERE isActive__c =: TRUE_BOOLEAN_VALUE ORDER BY Skill_Rating__c DESC';
        System.debug('skillsGetQuery >> '+skillsGetQuery);
        for(Skill__c skill : Database.query(String.escapeSingleQuotes(skillsGetQuery), AccessLevel.USER_MODE)){
            SkillWrapper skillWrap = new SkillWrapper();
            skillWrap.id = skill.Id;
            skillWrap.skillName = skill.Name;
            skillWrap.skillRating = Integer.valueOf(skill.Skill_Rating__c);
            skillWrapperList.add(skillWrap);
        }
        return skillWrapperList;
    }


    public class PortfolioWrapper{
        @AuraEnabled public List<ExperienceComponentWrapper> experiences;
        @AuraEnabled public List<CertificationsWrapper> certifications;
        @AuraEnabled public List<SkillWrapper> skills;
    }

    public class ExperienceComponentWrapper{
        @AuraEnabled public String id;
        @AuraEnabled public String name;
        @AuraEnabled public String recordTypeName;
        @AuraEnabled public String roleName;
        @AuraEnabled public String workDescription;
        @AuraEnabled public String iconName;
        @AuraEnabled public Integer priorityOrder;
        @AuraEnabled public Boolean isCurrentOrg;
        @AuraEnabled public Date startDate;
        @AuraEnabled public Date endDate;
    }

    public class CertificationsWrapper{
        @AuraEnabled public String id;
        @AuraEnabled public String name;
        @AuraEnabled public String iconName;
        @AuraEnabled public Integer desktopDisplaySize;
    }

    public class SkillWrapper {
        @AuraEnabled public String id;
        @AuraEnabled public String skillName;
        @AuraEnabled public Integer skillRating;
    }
}