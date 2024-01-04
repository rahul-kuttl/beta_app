import { Router } from 'express';
import * as lineItemController from '../../controllers/line_item_controller';
//import { validateLineItem, validateMultipleLineItems } from '../../middlewares/validation_middleware';

const router = Router();

// Routes for handling multiple line items (bulk actions)
router.post('/global',  lineItemController.addLineItems);
router.put('/global',  lineItemController.modifyPurchaseItems);
router.delete('/global', lineItemController.removePurchaseItems);
router.get('/global', lineItemController.getPurchaseItems);

// Routes for handling individual line item actions
router.post('/', lineItemController.addLineItem);
router.put('/:itemId', lineItemController.modifyPurchaseItem);
router.delete('/:itemId', lineItemController.removeLineItem);
router.get('/:itemId', lineItemController.getPurchaseItem);

export default router;
