public with sharing class {
  public static void updateDeactivatedOwnerOnOpenOpportunities(
    List<User> newUserList,
    Map<Id, User> oldUserMap
  ) {
    Map<Id, User> usersQualifyingForOwnerChange = new Map<Id, User>();
    List<Opportunity> opportunityListToBeUpdated = new List<Opportunity>();
    for (User usr : newUserList) {
      if (
        !usr.IsActive &&
        oldUserMap.get(usr.Id).IsActive &&
        usr.ManagerId != null
      ) {
        usersQualifyingForOwnerChange.put(usr.Id, new user());
      }
    }

    for (User usr : [
      SELECT
        Id,
        ManagerId,
        Manager.IsActive,
        Manager.Manager.Id,
        Manager.Manager.IsActive
      FROM User
      WHERE Id IN :usersQualifyingForOwnerChange.KeySet()
    ]) {
      usersQualifyingForOwnerChange.put(usr.Id, usr);
    }

    for (Opportunity opp : [
      SELECT Id, OwnerId
      FROM Opportunity
      WHERE
        OwnerId IN :usersQualifyingForOwnerChange.keySet()
        AND IsClosed = TRUE
    ]) {
      User usrInstance = usersQualifyingForOwnerChange.get(opp.OwnerId);

      if (usrInstance.ManagerId != null && usrInstance.Manager.IsActive) {
        opp.OwnerId = usrInstance.ManagerId;
        opportunityListToBeUpdated.add(opp);
      } else if (
        usrInstance.Manager.Manager.Id != null &&
        usrInstance.Manager.Manager.IsActive
      ) {
        opp.OwnerId = usrInstance.Manager.Manager.Id;
        opportunityListToBeUpdated.add(opp);
      }
    }

    Database.update(opportunityListToBeUpdated, System.AccessLevel.SYSTEM_MODE);
  }
}
