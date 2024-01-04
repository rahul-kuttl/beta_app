import { Router } from 'express';
import * as purchaseController from '../../controllers/purchase_controller';
//import { validateSinglePurchase, validateMultiplePurchases } from '../../middlewares/validation_middleware';
import mongoose from 'mongoose';

const router = Router();

// Routes for handling multiple purchases (group actions)
router.get('/global', purchaseController.viewMultiplePurchases);
//router.post('/global', validateMultiplePurchases, purchaseController.addMultiplePurchases);
router.post('/global', purchaseController.addMultiplePurchases);
router.delete('/global', purchaseController.removeMultiplePurchaseItems);
router.put('/global', purchaseController.updateMultiplePurchaseItems);




// Routes for handling individual purchase actions
router.get('/:purchaseId', purchaseController.viewPurchase);
router.post('/',  purchaseController.addPurchase);
router.delete('/:purchaseId', purchaseController.removePurchaseItem);
router.put('/:purchaseId', purchaseController.updatePurchaseItem);



export default router;
