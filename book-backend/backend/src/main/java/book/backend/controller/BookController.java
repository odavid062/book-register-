package book.backend.controller;


import book.backend.model.BookModel;
import book.backend.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "http://localhost", allowedHeaders = "*", allowCredentials = "true")
public class BookController {
    @Autowired
    private BookRepository bookRepository;

    @GetMapping
    public List<BookModel> getAllBooks(){
        return bookRepository.findAll();
    }

    @PostMapping
    public BookModel createBook(@RequestBody BookModel book) {
        return bookRepository.save(book);
    }  
}
