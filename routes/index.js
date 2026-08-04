const express = require('express');
const projectsRouter = require('./projects');
const createCrudRouter = require('./simpleCrud');

const router = express.Router();

router.use('/projects', projectsRouter);
router.use('/structures', createCrudRouter('structures', { orderBy: 'id DESC' }));
router.use('/indicators', createCrudRouter('indicators', { orderBy: 'id DESC' }));
router.use('/settings', createCrudRouter('settings', { orderBy: 'id DESC' }));

router.use('/tadat/poa', createCrudRouter('tadat_poa', { orderBy: 'sort_order ASC, id ASC' }));
router.use('/tadat/indicators', createCrudRouter('tadat_indicators', { orderBy: 'sort_order ASC, id ASC' }));
router.use('/tadat/criteria', createCrudRouter('tadat_criteria', { orderBy: 'sort_order ASC, id ASC' }));

router.use('/bready/sections', createCrudRouter('bready_sections', { orderBy: 'sort_order ASC, id ASC' }));
router.use('/bready/indicators', createCrudRouter('bready_indicators', { orderBy: 'id ASC' }));

router.use('/indexlar/components', createCrudRouter('index_components', { orderBy: 'sort_order ASC, id ASC' }));
router.use('/indexlar/indicators', createCrudRouter('index_indicators', { orderBy: 'id DESC' }));
router.use('/indexlar/workflow', createCrudRouter('index_workflow_steps', { orderBy: 'sort_order ASC, step_no ASC' }));
router.use('/indexlar/report-forms', createCrudRouter('index_report_forms', { orderBy: 'sort_order ASC, id ASC' }));

module.exports = router;
