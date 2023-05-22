# eBuy

This e-commerce site is an online platform that allows users to browse and purchase products from various categories. It aims to provide a seamless and enjoyable shopping experience for customers while offering a convenient way for businesses to showcase and sell their products.

## Live link

https://lucky-sawine-aaafe6.netlify.app

## Key Features

- User Registration and Authentication: Users can create an account, log in, and manage their personal information and can see their order history.
- Product Catalog: The site displays a wide range of products with detailed descriptions, images, and pricing information.
- Shopping Cart: Users can add products to their cart, view the cart contents, and proceed to checkout.
- Search: Users can easily search for products based on keywords.
- Filtering: Users can filter product based on price and categories.
- Admin Dashboard: Administrators have access to a dashboard to manage products.

## Project Summary

- Completed all the tasks.
- As in project fake store API is used thats why any create, update and delete will not make any effect on the database. It will only return an object with new data.So, I have implemented the localStorage to make every thing sync to make real time update in the UI.I have also implemented useContext hook to communicate between different components in the whole app.
- I have used a lot of reusable components.Such as modal,loading,products and so on
- I have implemented a very fast searching way
- I have used jwt decode to get the user data.
- I have used many different packages.
- In additionally, I have implemented some extra things such as user can see the most three rated products which is calculated by product rating and count and also implemented the categorical search

## Table of Contents

- [Installation](#installation)
- [TechnologiesUsed](#TechnologiesUsed)
- [Usage](#usage)
- [Contact](#contact)

## Installation

1. Clone the repository:

   ```shell
   git clone https://github.com/RownokNishat/eCommerce
   ```

2. Install the dependencies:

   ```shell
   cd eCommerce
   npm install
   ```

3. Configure the project by updating the config.js file with your desired settings.

4. Start the application:

   ```shell
   npm start
   ```

## TechnologiesUsed

- Front-end: HTML, CSS, React.js
- Used Library: Tailwind CSS, DaisyUI
- API: Fake Store API
- Additional Tools: UseContext, LocalStorage, Axios
- Used Packages:react-router-dom, heroicons, jwt-decode, react-toastify, react-loader-spinner , react-paginate

## Usage

1. LoginPage:

   User has to give correct username and password to logged in

   [![Login.png](https://i.postimg.cc/T3J6vjjM/Login.png)](https://postimg.cc/qNqY83Zj)

2. SignUpPage:

   User have to give username,email,password,phone,address to sign up

   [![SignUp.png](https://i.postimg.cc/0yhqjw1q/SignUp.png)](https://postimg.cc/dhRfSD0W)

3. LandingPage:

   User will see this picture when he/she will come to the website

   [![landing-Banner.png](https://i.postimg.cc/hPcQtVff/landing-Banner.png)](https://postimg.cc/XX1Y2GKb)

   This are the most popular products based on user rating and count

   [![landing-Most-Popular-Products.png](https://i.postimg.cc/7hY4pPZY/landing-Most-Popular-Products.png)](https://postimg.cc/YGVTFHFJ)

   Here user can sort the products on the basics of price

   [![Landingsorting-Section.png](https://i.postimg.cc/QCtLf6fF/Landingsorting-Section.png)](https://postimg.cc/Kkdsz5Sb)

   Here user can find wished category product

   [![Landing-Catagory-Wise-Search.png](https://i.postimg.cc/CKVW3MvT/Landing-Catagory-Wise-Search.png)](https://postimg.cc/qNjbnrVj)

4. SearchPage:

   Here user can search any products by their title and description

   [![Landing-Search.png](https://i.postimg.cc/85Z9fRTN/Landing-Search.png)](https://postimg.cc/1nNJLNgj)

5. UserProfilePage:

   User can see his/her information and also update his/her information

   [![Profile.png](https://i.postimg.cc/fLJXKpgd/Profile.png)](https://postimg.cc/VrPdsGws)

   [![Update-Profile.png](https://i.postimg.cc/JhQKgfqd/Update-Profile.png)](https://postimg.cc/KKRn3sCn)

6. CartPage:

   User can see his/her cart products

   [![Cart.png](https://i.postimg.cc/3N0R4HfL/Cart.png)](https://postimg.cc/xNYYhB2H)

7. PurchaseHistoryPage:

   Here User can see previous purchase history and also check how much he/she has spend on each categories

   [![Purchase-History.png](https://i.postimg.cc/Cx5Fz0Zb/Purchase-History.png)](https://postimg.cc/NKhhzWk0)

8. AdminPage:

   UserId 1 treated as admin

   - username: johnd
   - password: m38rmF$

   If a normal user is logged in he/she will find this type of options

   [![normaluser.png](https://i.postimg.cc/vHrjWwY0/normaluser.png)](https://postimg.cc/RN0XB8nt)

   If an admin logged in he/she will find an extra option for admin activities

   [![Adminuser.png](https://i.postimg.cc/0ytVf8L0/Adminuser.png)](https://postimg.cc/21Zdjfj1)

   Admin can see all the products and admin can create,update and delete products

   [![Admin-Page.png](https://i.postimg.cc/jS0WfLby/Admin-Page.png)](https://postimg.cc/vchHF8Dm)

   [![Add-Product-Admin.png](https://i.postimg.cc/TPvrTt1M/Add-Product-Admin.png)](https://postimg.cc/CRJZNHbm)

   [![Update-Product-Admin.png](https://i.postimg.cc/D0wNBv3g/Update-Product-Admin.png)](https://postimg.cc/qhWQ7dRh)

## Contact

For any inquiries or feedback, please contact us at rownokjahannishat17@gmail.com
