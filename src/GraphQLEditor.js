import React, { useState } from 'react';
import { GraphQLEditor } from 'graphql-editor';

// type Query and Mutations are set as code and all other types are set as library

const types = {
  code:
  `type Query {
    getAvailabilityRequests(status:[String]
        pageOptions: LimitOffsetInput,
        sortOption: SortOption ): getAvailabilityRequests

    getAvailabilityRequest(podConfigId:Int) : AvailabilityRequest

    getAvailabilityRoleRequests(status:[String]
        pageOptions: LimitOffsetInput,
        sortOption: SortOption): AvailabilityRoleRequests

    getUser(email:String!): User

    getUsers(
        pageOptions: LimitOffsetInput,
        searchNameOrEmail: String
    ):getUsers

    getPodConfigsByPRID(prId: String,
        pageOptions: LimitOffsetInput,
        sortOption: SortOption,
        filterOptions: [FilterOption]
    ): getPodConfigs

    getPodConfig(podConfigId: Int):PodConfig

    getPodConfigs(
        status:[String]
        pageOptions: LimitOffsetInput,
        sortOption: SortOption
    ) : getPodConfigs

    getPodConfigsForPO(
            status:[String]
            pageOptions: LimitOffsetInput,
            sortOption: SortOption
        ) : getPodConfigs

    getNominationsForPositionConfig(
        positionConfigId:Int!,
        nominationStatus:[String],
        sortOption: SortOption,
        pageOptions: LimitOffsetInput): getNominationsForPositionConfig

    getNominationsForHasher(
        email: String!
        nominationStatus: [String]
        sortOption: SortOption
        pageOptions: LimitOffsetInput
    ): getNominationsForHasher
    getNomination(nominationId: Int!):Nomination

    getSystemStatus(id:String):SystemStatus

    executePodQuery(executeQueryInput:ExecuteQueryInput):QueryResponse

    getCommentsForEntityIdAndName(entityId: Int, entityName: String, pageOptions: LimitOffsetInput): getCommentsForEntityIdAndName

    getPodConfigsBySearchAndFilter(
                    search: String,
                    status: [String]!,
                    pageOptions: LimitOffsetInput,
                    sortOption: SortOption,
                    filterOptions: [FilterOption]
                    ): getPodConfigsBySearchAndFilter

    getPodConfigsBySearchAndFilterForPO(
                    search: String,
                    status: [String]!,
                    pageOptions: LimitOffsetInput,
                    sortOption: SortOption,
                    filterOptions: [FilterOption]
                    ):getPodConfigsBySearchAndFilterForPO

    getAllPodConfigs(prIds : [String],
                     pageOptions: LimitOffsetInput,
                     sortOption: SortOption,
                     filterOptions: [FilterOption]
                     ):getAllPodConfigs

    getChangeRequest(podConfigId: Int!): ChangeRequest

    getPodConfigWithChanges(podConfigId: Int!): PodConfig

    getPodConfigsBySweName(sweName : String,
        pageOptions: LimitOffsetInput,
        sortOption: SortOption
    ):getPodConfigsBySweName
}

type getAllPodConfigs{
    result : [PodConfig]
    pagination: LimitOffsetPaginationType
}

type QueryResponse {
    object:JSON
    error:String
    success:String
    ok:Boolean
}

input ExecuteQueryInput{
    query:String
    variables:JSON
    opName: String
}

input FilterOption {
    columnName : String
    filterValue : [String]
}

type SystemStatus {
    status:String
}

input SortOption {
    sortKey: String
    sortOrder: String
}

type getPodConfigsBySearchAndFilter{
    result: [PodConfig]
    pagination: LimitOffsetPaginationType
}

type getPodConfigsBySearchAndFilterForPO{
    result: [PodConfig]
    pagination: LimitOffsetPaginationType
}

type getPodConfigsBySweName{
    result: [PodConfig]
    pagination: LimitOffsetPaginationType
}

type AvailabilityRoleRequests {
    result: [PositionConfig]
    pagination: LimitOffsetPaginationType
}

type getCommentsForEntityIdAndName {
     result: [Comment]
     pagination: LimitOffsetPaginationType
}

type getAvailabilityRequests {
    result: [AvailabilityRequest]
    pagination: LimitOffsetPaginationType
}

type getPodConfigs {
    result: [PodConfig]
    pagination: LimitOffsetPaginationType
}

type AvailabilityRequest {
    availabilityRequestId: Int
    allocationOwnerComment: String
    availabilityRequestStatus:String
    createdAt: String
    overAllConfidence: String
    podLevelComment: String
    requestFacilitatorEmail: String
    updatedAt: String
    podConfig: PodConfig
    positionResponses: [PositionResponse]
}

type PodConfig{
    podConfigId: Int
    podConfigName: String
    podConfigDescription: String
    prId: String
    createdAt: String
    updatedAt: String
    confirmedOn: String
    closedOn: String
    isDeleted: Boolean
    podConfigStatus: String
    podSize: Int
    startDate: String
    updatedBy: User
    createdBy: User
    pod: Pod
    project: Project
    availabilityRequests: [AvailabilityRequest]
    positionConfigs: [PositionConfig]
    movedToAeAt: String
    movedToAeBy: User
    comments: [Comment]
    rejection : Rejection
    isModified : Boolean
    canRevertToInProgress: Boolean
    sweName: String # If null HASHEDIN will be the SWE
    configType: String # This will be used for handling Project Level allocations
}

type Rejection {
    rejectionId: Int
    rejectionReason: String
    createdAt: String
    updatedAt: String
    updatedBy: User
    createdBy: User
    isDeleted: Boolean
    entityName: String
    entityId: Int
    rejectedNomination: Nomination
}

type Project{
    projectId: String
    projectName: String
    account: Account
    projectManager: User
    deliveryLeader: User
}

type Account{
    accountId: String
    accountName: String
}

input AvailabilityRequestInput {
    podConfigId: Int
    requestFacilitatorEmail: String
}

type PositionConfig {
    positionConfigId: Int
    positionName: String
    trackId : Int
    trackName : String
    capabilityId : Int
    capabilityName : String
    isDeleted: Boolean
    positionStatus: String # optional
    comment: String
    startDate: String
    confirmedHasher: User # optional
    podConfig: PodConfig
    positionResponses: [PositionResponse]
    nominations: [Nomination]
    skills: [Int]
    band: String
    updatedAt: String
    rejection : Rejection
}

type PositionResponse{
    positionResponseId: Int
    confidence: String
    isDeleted: Boolean
    positionResponseStatus: String
    positionConfig : PositionConfig
}

input SkillInput {
    skillId: Int
    skillName: String
}

input PositionConfidenceInput{
    confidence: String
    positionConfigId: Int
    availabilityRequestId: Int
}

input PodConfidenceInput{
    podConfidence: String
    comments: String
    availabilityRequestId: Int
}

type ChangeRequest{
    crId : Int
    createdAt : String
    updatedAt : String
    updatedBy : User
    podConfigId : Int
    podConfigInput : CRPodConfig
    crStatus : String
    changeRequestVersionId: Int
}

type CRPodConfig{
    podConfigId: Int
    podConfigName: String
    prId: String # PR1
    podSize: Int
    startDate: String
    project: CRProjectInput
    positionConfigs: [CRPositionConfigInput]
    podConfigDescription: String
    isApprovalRequired: Boolean
}

type CRProjectInput{
    projectId: String
    projectName: String
    account: CRAccountInput
}

type CRAccountInput{
    accountId: String
    accountName: String
}

type CRPositionConfigInput {
    positionConfigId : Int
    positionName : String
    trackId : Int
    trackName : String
    capabilityId : Int
    capabilityName : String
    comment : String
    startDate : String
    skills: [Int]
    band: String
}

input PodRequestInput {
    podConfigId: Int
    podConfigStatus: String
    podName : String
    podId : String
    podStatus : String
    projectManagerEmail : String
    deliveryLeaderEmail : String
    requestFacilitatorEmail : String
    allocationOwnerEmail : String
    podCreatedAt: String
}

input PodMapInput {
    podConfigId: Int
    podName : String
    podId : String
    projectManagerEmail : String
    deliveryLeaderEmail : String
    movedToAeByEmail : String
    podCreatedAt: String
}

input PodConfigInput {
    podConfigId: Int
    podConfigName: String
    prId: String # PR1
    podSize: Int
    startDate: String
    project: ProjectInput
    positionConfigs: [PositionConfigInput]
    podConfigDescription: String
    isApprovalRequired: Boolean
    sweName: String
    configType: String
}

input ProjectInput{
    projectId: String
    projectName: String
    account: AccountInput
}

input AccountInput{
    accountId: String
    accountName: String
}

input PositionConfigInput {
    positionConfigId : Int
    positionName : String
    trackId : Int
    trackName : String
    capabilityId : Int
    capabilityName : String
    comment : String
    startDate : String
    skills: [Int]
    band: String
}

input AdminOpsInput {
    cmd: String
    table: String # can be User table
    args: String  # args can have email to perform op
}

type Mutation {
    createAvailabilityRequest(availabilityRequest:AvailabilityRequestInput): MutationResponse

    cancelAvailabilityRequest(availabilityRequestId:Int):MutationResponse

    provideConfidenceForPosition(positionConfidenceInput:PositionConfidenceInput):MutationResponse

    provideConfidenceForPod(podConfidenceInput:PodConfidenceInput):MutationResponse

    commitPodRequest(podConfigId:Int): MutationResponse

    updateAllocationRequestStatus(podRequestInput:PodRequestInput): MutationResponse

    mapPodToPodConfig(podMapInput:PodMapInput):MutationResponse

    updateProfile(userProfileInput:UserProfileInput):MutationResponse

    executeAdminOps(adminOpsInput: AdminOpsInput):MutationResponse

    createOrUpdatePodConfig(podConfigInput:PodConfigInput, requestFacilitatorEmail:String): MutationResponse

    provideStatusForEmails(emails: [String]): User

    nominateHasher(email: String, positionConfigId: Int ): MutationResponse

    nominateHashers(emails: [String], positionConfigId: Int ): MutationResponse

    removeNomination(nominationId: Int): MutationResponse

    optInOrOptOutForNomination(optInOptOutNominationInput:OptInOptOutNominationInput): MutationResponse

    provideConfidenceForNomination(nominationConfidenceInput: NominationConfidenceInput): MutationResponse

    selectOrShortlistNomination(nominationId: Int): MutationResponse

    aoPodConfirmation(podConfigId: Int!): MutationResponse

    poPodAcceptance(podConfigId: Int!): MutationResponse

    poPodReject(poPodRejectInput: PoPodRejectInput!): MutationResponse

    sendEmail(email:String): MutationResponse

    createUser(userProfileInput:UserProfileInput):MutationResponse

    createPod(createPodInput : CreatePodInput): MutationResponse

    syncPodOwners(syncPodOwnersInput : SyncPodOwnersInput): MutationResponse

    customEvent(objectInput:String): MutationResponse

    overrideNomination(hasherEmail: String!, positionConfigId: Int!, overrideReason:String!, hasHasherConsent: Boolean): MutationResponse

    addCommentForEntityIdAndName(commentInput: CommentInput): MutationResponse

    editCommentForEntityIdAndName(commentInput: CommentInput): MutationResponse

    cancelPodConfigs(podConfigIds: [Int]!, cancellationReason:String!, userEmail:String!): MutationResponse

    hasherConfirmNomination(nominationId: Int!) : MutationResponse

    copyPodConfig(podConfigId: Int!, newPodConfigName: String!, userEmail:String!, startDate: String) : MutationResponse

    approveChangeRequest(podConfigId: Int!, requestFacilitatorEmail: String) : MutationResponse

    rejectChangeRequest(podConfigId: Int!, requestFacilitatorEmail: String) : MutationResponse

    aoReviewChangeRequest(podConfigId: Int!, podConfigInput:PodConfigInput, changeRequestVersionId: Int!) : MutationResponse

    ## migrationType - accountFact/podFact/allocationFact
    ## s3Path - key to s3 object
    executeMigration(migrationType: String, s3Path: String, pageOptions: LimitOffsetInput):MutationResponse

    loadUsersUsingDashboard(fromDate:String!, pageSize: Int!, currentPage:Int!):MutationResponse
}

input PoPodRejectInput {
    podConfigId: Int!
    podRejectionReason: String
    positionConfigRejections: [PoPositionConfigRejectInput]
}

input PoPositionConfigRejectInput {
    positionConfigId: Int!
    positionRejectionReason: String
}

input NominationConfidenceInput{
    nominationId: Int
    nominationConfidence: String
    nominationComment: String
}

input UpdatePodInput {
    podId: String!
    configured: Boolean!
    allocationAccepted: Boolean!
    allocationConfirmed: Boolean!
    podConfirmed: Boolean!
}

input HasherInterestInput{
    nominationId: Int!
    hasherId: Int!
    comment: String
    hasHasherConfirmed: Boolean
}

input reviewHasherForPositionInput{
    action: String
    comment: String
    confidence: String
    hasherId: Int!
    positionId: Int!
}

type MutationResponse {
    ok: Boolean
    error: String
    success: String
    object: JSON
}

type RevisionHistory {
    result : RevisionTypes
    revisionNumber: String
    revisionDate: String
}

type User {
    id: Int!
    uuid: String!
    name: String
    email: String!
    profileUrl: String
    designationId: Int
    designationName: String
    bandId: Int
    bandName: String
    roles: [UserRole]
    departmentId: Int
    departmentName: String
    nominations: [Nomination]
}

input UserProfileInput {
    uuid:String
    name: String
    email: String
    profileUrl: String
    designation: JSON
    band: JSON
    skills: JSON
    department: JSON
    roles: [UserRoleInput]
}

input UserRoleInput{
    roleId: Int
    userRoleType: String
}

input MetaObject{
    id: Int
    name: String
}

type UserRole{
    roleId: Int
    userRoleType: String
}

type getPods {
    result: [Pod]
    pagination: LimitOffsetPaginationType
}

type getUsers{
    result: [User]
    pagination: LimitOffsetPaginationType
}

type getPositionsForPod {
    result: [Position]
    pagination: LimitOffsetPaginationType
}

type getNominationsForPositionConfig{
    result: [Nomination]
    pagination: LimitOffsetPaginationType
}

type getNominationsForHasher{
    result: [Nomination]
    pagination: LimitOffsetPaginationType
}

type Pod {
    podId : String
    podName : String
    allocatedPositions : Int
    selectedPositions : Int
    openPositions : Int
    nominatedPositions : Int
    allocationOwnerComment : String
    isAllocationConfirmedByAo : Boolean
    isAllocationConfirmedByPmDl : Boolean
    poFinalComment : String
    status : String
    createdAt : String
    updatedAt : String
    updatedBy: User
    createdBy: User
    podConfig : PodConfig
#    projectManager : User
#    deliveryLeader : User
    allocationOwner : User
    podCreatedAt : String
}

type LimitOffsetPaginationType{
    totalCount: Int
    currentCount: Int
}

input LimitOffsetInput{
    pageNo: Int
    pageSize: Int
}

input NominationInput{
    hasherEmail: String!
    positionId: Int!
    nominate: Boolean
}

type Position {
    positionId: ID
    description: String
    isAllocationConfirmed: Boolean
    startDate: String
    endDate: String
    required: Int
    positionStatus: String
    designationId: Int
    designationName: String
    Band: JSON
    skills: JSON
    confirmedHashers: [User]
    nominations: [Nomination]
    pod: Pod
    updatedBy: User
    createdAt : String
    createdBy: User
}

type Nomination {
    nominationId: Int
    hasHasherConfirmed: Boolean
    nominationType: String
    hasherComment: String
    poComment: String
    nominatedHasher: User
    nominatedBy: User
    nominatedAt: String
    expiryAt: String
    positionConfig: PositionConfig
    nominationStatus: String
    podName:String
    projectName:String
    accountName:String
    allocationEndDate:String
    poConfidence: String
    optedAt: String
    poRespondedAt: String
    overrideReason: String
    updatedAt: String
    updatedBy: User
    createdAt: String
    createdBy: User
}

input OptInOptOutNominationInput {
    nominationId: Int
    hasherComment: String
}

input CreatePodInput {
    podId:String
    podName:String
    podConfigId: Int
    createdBy:String
    podCreatedAt:String
}

type Comment{
    commentId: Int
    body: String
    entityId: Int
    entityName: String
    createdAt: String
    createdBy: User
    updatedAt: String
    isEdited: Boolean
    parent: Comment
    mentions: String # CSV
    replies: [Comment]
}

input CommentInput{
    commentId: Int
    message: String!
    parentId: Int
    entityId: Int
    entityName: String
    mentions: String # CSV
}

input SyncPodOwnersInput {
    prId: [String]
    dlEmail: String
    pmEmail: String
}

scalar JSON

union RevisionTypes = Nomination | Pod | User`
}

export const GraphQLEditorComponent = () => {
const [mySchema, setMySchema] = useState({
  code: types.code,
  //code: '',
  libraries: types.library
});
const placeholderData = "Start writing the schema";

return (
    <div
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        alignSelf: 'stretch',
        display: 'flex',
        position: 'relative',
      }}
    >
      <GraphQLEditor placeholder={placeholderData}
        schema={mySchema}
        setSchema={(props)=> {
            console.log("setSchema called", props);
            setMySchema(props);
        }}
        readonly={false}
        //diffSchemas={oldSchema: mySchema; newSchema: mySchema}
        activePane="diagram"
        //state={pane: ActivePane}
        onStateChange={()=>{
          console.log("onStateChange called")
        }}
        
        onTreeChange={(tree)=> {
            console.log("onTreeChange called")
        }}
      />
    </div>
  );
};