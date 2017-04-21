
#Float width = 80
#Integer i

<table border="3" rules = "all">
    <tr>
      #Reader r_desc = r.desc()
	  #Field f = r_desc.getField("name")
	  #while r_desc.next()
        <th>${f.getString()}</th>
	  #endwhile
    </tr>
	#while (r.next())
    <tr>
	  #for i = 0 to r.getFieldCount() - 1 step 1
	    #f = r.getField(i)
	    #String v
	    #if f.getDataType() = "Timestamp" then
	      #v = f.getTimestamp().asString()
	    #else 
          #v = r.getField(i).getString()
        #endif
        <td>${v}</td>
	  #next
    </tr>
	#endwhile
</table>
