package com.sa.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloWorldController {
 
    @RequestMapping(value = {"/home" }, method = RequestMethod.GET)
    public String homePage(ModelMap model) {
        model.addAttribute("greeting", "Hi, Welcome to mysite. ");
        return "welcome";
    }
 
    @RequestMapping(value = "/admin", method = RequestMethod.GET)
    public String adminPage(ModelMap model) {
        model.addAttribute("user", getPrincipal());
        return getPrincipal();
    }
 
    @RequestMapping(value = "/db", method = RequestMethod.GET)
    public String dbaPage(ModelMap model) {
        model.addAttribute("user", getPrincipal());
        return "dba";
    }
    
    @PreAuthorize("denyAll")
    @RequestMapping(value = "/db1", method = RequestMethod.GET)
    public String dbaPage1(ModelMap model) {
        return "dba1";
    }
    
    @RequestMapping(value="/logout", method = RequestMethod.GET)
       public String logoutPage (HttpServletRequest request, HttpServletResponse response, SessionRegistry sessionRegistry) {
          Authentication auth = SecurityContextHolder.getContext().getAuthentication();
          HttpSession session = request.getSession(false);
          session.invalidate();	
          if (auth != null){    
             new SecurityContextLogoutHandler().logout(request, response, auth);
          }
          sessionRegistry.getAllSessions(auth.getPrincipal(), true).stream().forEach(sess -> sess.expireNow());
          return "welcome";
       }
 
    @RequestMapping(value = "/Access_Denied", method = RequestMethod.GET)
    public String accessDeniedPage(ModelMap model) {
        model.addAttribute("user", getPrincipal());
        return "accessDenied";
    }
     
    private String getPrincipal(){
        String userName = null;
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
 
        if (principal instanceof UserDetails) {
            userName = ((UserDetails)principal).getUsername();
        } else {
            userName = principal.toString();
        }
        return userName;
    }
}