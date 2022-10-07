import {Tabs, Tab, Container} from 'react-bootstrap';
import '../../css/AdminPanel.css'
import Brands from './Brands'
import AddProducts from './AddProducts';
import AddCategories from './AddCategories';
import Orders from './Orders';

function AdminPanel () {    

    return <>
    <Container>
        <div className='d-flex flex-column align-items-center justify-content-center mt-4'>
            <h2>Admin Panel</h2>
            <div className='w-50 admin-panel'>
                <Tabs defaultActiveKey="brands" className="mb-3">
                    <Tab eventKey="brands" title="Бренди"><Brands /></Tab>
                    <Tab eventKey="categories" title="Категорії"><AddCategories /></Tab>
                    <Tab eventKey="products" title="Товари"><AddProducts /></Tab>
                    <Tab eventKey="orders" title="Замовлення"><Orders /></Tab>
                </Tabs>
            </div>
        </div>
    </Container></>
}

export default AdminPanel;