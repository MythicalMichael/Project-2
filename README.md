## Welcome page


In this screen we need to see the app's name + 'create button' + 'login button' with 2 inputs

- Create Button: 
router.get "/auth/signup"  (as Admin) creating user 



- LoginSubmit Button:
router.post "/welcome"   redirecting us to the main page "/"




## Signup (member + admin)

In this screen we need to have two inputs: 'username' + 'password'. (email)
Also, two buttons: 'Let's go' and 'Create group'. Each one appeaLors depending on role.


- Admin see only the create button
"You will be the Admin"
ADMIN EXPERIENCE with Signup:
After we have clicked on 'create group' we become automatically the admin. We only see the 'CREATE GROUP' button.
router.get "creategroup"

- Member see only the lets go button (after the invitation link)
"You have been invited"
MEMBER EXPERIENCE with Signup:
After we have accessed to the link, we can become a member of the group. We only see the 'LET'S GO' button.

## create create-group (admin only)

router.post 
groupname 
and group description
"Done" button to submit

## Login (member + admin)
router.post "/welcome" enter username and password
and then user will be redirected to the dashboard/homepage "/"
depending on wether he is an admin or not 

## Dashboard
- Member: TaskList, Navbar: (MyProfile, MyGroup, LogOutButton), ProgressIndicator

- Admin: Member + Adding, Deleting, Editing
adding and deleting and writing the task 

## create Layout for the Navbar
- Navbar: MyProfile, MyGroup, LogOutButton

Button MyProfile: router.get "userProfile"

Button MyGroup: router.get goupscreen

Button Logoutbutton: deletes cookies and ends sessio you should appear back on the welcoming page *if time Popup "are you sure you want to leave **little animation"

## create groupscreen
Navbar


- Member:

Member List: UserList

ProgressIndicator of the Group

- Admin: 
Member + Add Member, Delete Member Link for inviting Members



## DashBoard of other members

(ask TA or Andre)

##  (my)Profile

4 Inputs to change check Profile info
*Avatar/Profile Picture

username:

password:

group:

email:

Edit Button: edit profile router get "edit-profile"

Delete Button : delete Account button removes you from the database


## edit profile 

shows you inputs where you can update your profile

## Error handlers