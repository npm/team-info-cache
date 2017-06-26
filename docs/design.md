# Caching Team Data

The problem: getting information about teams on wubwub frequently leads to pages
where we need a lot calls that are costly. The lookup needs to be able to take
bulk requests and to have a very fast response.

## What data do we need?

There should be three shapes of data that come back:
[TeamMembership](https://github.com/npm/user-acl-two/blob/master/docs/API.md#team-membership)s,
[PackageTeam](https://github.com/npm/user-acl-client/blob/master/docs/API.md#packageteam)s,
and [List](https://github.com/npm/user-acl-two/blob/master/docs/API.md#list-response)s.

Your response from an endpoint will be a List of any of those three types.

Likely, you will see a <List<List<TeamMember|PackageTeam>>>

## What will this not do?

Access will not be checked when requesting from this service, that means you
are expected to have checked/filtered access before making a request.

## API

### Package Teams

- `/v1/scopes/{scope}/package-teams?teams={team},{team}...`

Returns type <List<List<PackageTeam>>>.

### Team Membership

- `/v1/scopes/{scope}/team-memberships?teams={team},{team}...`
- `/v1/scopes/{scope}/team-memberships?user={user},{user}...`