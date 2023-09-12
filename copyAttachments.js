copyAttachment: function(file, table, record) {
    if(!this._attachmentExists(file, table, record)) {

        // Gets target record
        var targetRecord = new GlideRecord(table);
        targetRecord.get(record);

        // Copy file to target record
        var gsa = new GlideSysAttachment();
        gsa.writeContentStream(
            targetRecord,
            file.getValue('file_name'),
            file.getValue('content_type'),
            gsa.getContentStream(file.getValue('sys_id'))
        );
    }
}

_attachmentExists: function(file, table, record) {
    var gr = new GlideRecord('sys_attachment');
    gr.addQuery('table_name', table);
    gr.addQuery('table_sys_id', record);
    gr.addQuery('file_name', file.getValue('file_name'));
    gr.addQuery('size_bytes', file.getValue('size_bytes'));
    gr.addQuery('content_type', file.getValue('content_type'));
    gr.query();

    if(gr.next()) return true;

    return false;
}